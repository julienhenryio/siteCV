(function () {
  "use strict";

  const BANK = window.QUIZ_TOLERANCE || [];
  const QUIZ_SIZE = 10;

  // ── Mode depuis l'URL
  const params = new URLSearchParams(window.location.search);
  const mode = params.get("mode") || "random";

  const MODES = {
    random:    { label: "Quiz aléatoire",                filter: () => true },
    locataire: { label: "Locataire",                     filter: q => q.profile === "locataire" || q.profile === "both" },
    garant:    { label: "Garant",                        filter: q => q.profile === "garant"    || q.profile === "both" },
    cross:     { label: "Différences Locataire / Garant", filter: q => q.profile === "cross" }
  };
  const modeConfig = MODES[mode] || MODES.random;

  // ── Sélection des questions (shuffle + slice)
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  const pool = BANK.filter(modeConfig.filter);
  const questions = shuffle(pool).slice(0, Math.min(QUIZ_SIZE, pool.length));
  const total = questions.length;

  const state = {
    index: 0,
    score: 0,
    selected: [],
    submitted: false,
    history: []
  };

  // ── DOM refs
  const modeBadge        = document.getElementById("mode-badge");
  const modeBreadcrumb   = document.getElementById("mode-breadcrumb");
  const qScreen          = document.getElementById("quiz-question-screen");
  const rScreen          = document.getElementById("quiz-result-screen");
  const progressLabel    = document.getElementById("progress-label");
  const progressFill     = document.getElementById("progress-fill");
  const scoreLabel       = document.getElementById("score-label");
  const tagWrapper       = document.getElementById("question-type-tag-wrapper");
  const categoryWrapper  = document.getElementById("question-category-wrapper");
  const multiHint        = document.getElementById("multi-hint");
  const questionText     = document.getElementById("question-text");
  const answersContainer = document.getElementById("answers-container");
  const feedbackContainer= document.getElementById("feedback-container");
  const validateBtn      = document.getElementById("validate-btn");
  const nextBtn          = document.getElementById("next-btn");
  const restartBtn       = document.getElementById("restart-btn");

  if (modeBadge)      modeBadge.textContent = modeConfig.label;
  if (modeBreadcrumb) modeBreadcrumb.textContent = modeConfig.label;

  function letter(i) { return String.fromCharCode(65 + i); }
  function escapeHtml(s) {
    return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
  }
  function arrayEq(a, b) {
    if (a.length !== b.length) return false;
    const sa = [...a].sort(), sb = [...b].sort();
    return sa.every((v, i) => v === sb[i]);
  }
  function getOptions(q) {
    return q.type === "tf" ? ["Vrai", "Faux"] : q.options;
  }

  function renderQuestion() {
    state.selected = [];
    state.submitted = false;
    feedbackContainer.innerHTML = "";
    validateBtn.hidden = false;
    validateBtn.disabled = true;
    nextBtn.hidden = true;

    const q = questions[state.index];

    // Progress
    progressLabel.textContent = `Question ${state.index + 1} / ${total}`;
    progressFill.style.width = `${((state.index + 1) / total) * 100}%`;
    scoreLabel.textContent = `Score : ${state.score}`;

    // Type tag
    let tagText, tagClass;
    if (q.type === "tf")        { tagText = "Vrai / Faux";       tagClass = "is-tf"; }
    else if (q.type === "multi"){ tagText = "QCM multi-réponses"; tagClass = "is-multi"; }
    else                        { tagText = "QCM";                tagClass = ""; }
    tagWrapper.innerHTML = `<span class="question-type-tag ${tagClass}">${tagText}</span>`;
    categoryWrapper.innerHTML = q.category
      ? `<span class="question-category-tag">${escapeHtml(q.category)}</span>`
      : "";
    multiHint.hidden = q.type !== "multi";

    // Question
    questionText.textContent = q.question;

    // Next-btn label (last question)
    nextBtn.textContent = state.index === total - 1 ? "Voir le résultat" : "Question suivante";

    // Answers
    answersContainer.innerHTML = "";
    const opts = getOptions(q);
    opts.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "answer-option" + (q.type === "multi" ? " is-multi" : "");
      btn.dataset.index = i;
      btn.innerHTML = `<span class="answer-letter">${letter(i)}</span><span>${escapeHtml(opt)}</span>`;
      btn.addEventListener("click", () => toggleSelect(i, btn));
      answersContainer.appendChild(btn);
    });
  }

  function toggleSelect(i) {
    if (state.submitted) return;
    const q = questions[state.index];
    if (q.type === "multi") {
      const pos = state.selected.indexOf(i);
      if (pos >= 0) state.selected.splice(pos, 1);
      else state.selected.push(i);
    } else {
      state.selected = [i];
    }
    // Re-style
    answersContainer.querySelectorAll(".answer-option").forEach((b, idx) => {
      b.classList.toggle("is-selected", state.selected.includes(idx));
    });
    validateBtn.disabled = state.selected.length === 0;
  }

  function validate() {
    if (state.submitted || state.selected.length === 0) return;
    state.submitted = true;

    const q = questions[state.index];
    const correct = q.correct;
    const isCorrect = arrayEq(state.selected, correct);
    if (isCorrect) state.score += 1;

    state.history.push({
      question: q.question,
      type: q.type,
      category: q.category,
      options: getOptions(q),
      selected: state.selected.slice(),
      correct: correct.slice(),
      isCorrect,
      explanation: q.explanation
    });

    // Style options
    answersContainer.querySelectorAll(".answer-option").forEach((b, idx) => {
      b.disabled = true;
      b.classList.remove("is-selected");
      const isC = correct.includes(idx);
      const isS = state.selected.includes(idx);
      if (isC) b.classList.add("is-correct");
      else if (isS) b.classList.add("is-wrong");
      else b.classList.add("is-dimmed");
    });

    scoreLabel.textContent = `Score : ${state.score}`;

    const alertClass = isCorrect ? "fr-alert--success" : "fr-alert--error";
    const alertTitle = isCorrect ? "Bonne réponse !" : "Mauvaise réponse";
    feedbackContainer.innerHTML = `
      <div class="fr-alert ${alertClass} feedback-alert" role="status">
        <h3 class="fr-alert__title">${alertTitle}</h3>
        <p>${escapeHtml(q.explanation)}</p>
      </div>
    `;

    validateBtn.hidden = true;
    nextBtn.hidden = false;
    nextBtn.focus();
  }

  function nextQuestion() {
    if (state.index < total - 1) {
      state.index += 1;
      renderQuestion();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      showResults();
    }
  }

  function showResults() {
    qScreen.hidden = true;
    rScreen.hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });

    const pct = Math.round((state.score / total) * 100);
    const circle = document.getElementById("score-circle");
    document.getElementById("score-value").textContent = pct + "%";
    document.getElementById("score-detail").textContent = `${state.score}/${total}`;

    circle.classList.remove("is-good", "is-bad");
    let title, message;
    if (pct >= 80) { circle.classList.add("is-good"); title = "Excellent !"; message = "Vous maîtrisez très bien les cas de tolérance."; }
    else if (pct >= 50)                              { title = "Pas mal !"; message = "Quelques règles à revoir, mais c'est sur la bonne voie."; }
    else           { circle.classList.add("is-bad");  title = "À retravailler"; message = "Pensez à relire la page « Cas de tolérance » avant de réessayer."; }

    document.getElementById("score-title").textContent = title;
    document.getElementById("score-message").innerHTML =
      `${escapeHtml(message)} Vous avez répondu correctement à <strong>${state.score}/${total}</strong> questions.`;

    const reviewContainer = document.getElementById("review-container");
    reviewContainer.innerHTML = state.history.map((h, i) => {
      const icon = h.isCorrect
        ? '<span class="fr-icon-checkbox-circle-fill" aria-hidden="true" style="color: var(--text-default-success);"></span>'
        : '<span class="fr-icon-close-circle-fill" aria-hidden="true" style="color: var(--text-default-error);"></span>';
      const chosen = h.selected.length ? h.selected.map(i => h.options[i]).join(" + ") : "—";
      const correct = h.correct.map(i => h.options[i]).join(" + ");
      const block = h.isCorrect
        ? `<div class="review-item__a"><strong>Votre réponse :</strong> ${escapeHtml(chosen)}</div>`
        : `<div class="review-item__a"><strong>Votre réponse :</strong> ${escapeHtml(chosen)}<br><strong>Bonne réponse :</strong> ${escapeHtml(correct)}</div>`;
      return `
        <div class="review-item">
          <div class="review-item__head">
            <span class="review-item__num">Q${i + 1}</span>
            <div class="review-item__icon">${icon}</div>
            <div style="flex:1">
              <div class="review-item__q">${escapeHtml(h.question)}</div>
              ${block}
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  function restartQuiz() {
    // On retire 10 nouvelles questions et on relance — rechargement de la page
    // pour garantir un nouveau shuffle propre.
    window.location.reload();
  }

  validateBtn.addEventListener("click", validate);
  nextBtn.addEventListener("click", nextQuestion);
  restartBtn.addEventListener("click", restartQuiz);

  if (total === 0) {
    questionText.textContent = "Aucune question disponible dans ce mode.";
    validateBtn.hidden = true;
  } else {
    renderQuestion();
  }
})();
