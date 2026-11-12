/* Character creation, also used later to change her features ("My look"). */
(function (G) {
  'use strict';
  var U = G.ui;

  G.scenes.add('create', {
    title: 'createTitle',
    home: false,
    enter: function (root, params) {
      var st = G.state.data, edit = !!params.edit;
      var ui = U.layout(root, { stageCls: 'pad' });
      var svg = G.svg.make('-40 -30 940 1330', '', 'main');
      ui.stage.appendChild(svg);

      var tabs = [
        { id: 'girl', icon: 'skin', name: G.t('tabFace') },
        { id: 'hair', icon: 'hair', name: G.t('hair') },
        { id: 'pet', icon: st.pet.type, name: G.t('showPet') }
      ];
      var tab = params.tab || 'girl';

      function draw() {
        svg.innerHTML = '<g>' + G.doll.markup({ expr: 'smile' }) + '</g>' +
          '<g transform="translate(540 850) scale(0.9)">' + G.pet.markup({ mood: 'happy', mud: 0 }) + '</g>';
      }
      function sparkle(x, y) { G.fx.at(svg, x, y, { n: 8, spread: 80 }); }

      function nameField(labelKey, value, placeholder, onInput) {
        var f = U.el('label', 'field');
        f.appendChild(U.label(G.t(labelKey)));
        var inp = U.el('input', 'text-input');
        inp.type = 'text'; inp.maxLength = 14; inp.value = value || ''; inp.placeholder = placeholder;
        inp.autocomplete = 'off'; inp.spellcheck = false;
        inp.addEventListener('input', function () { onInput(inp.value.trim()); G.state.save(); });
        f.appendChild(inp);
        return f;
      }

      function body() {
        var b = ui.body;
        b.innerHTML = '';
        if (tab === 'girl') {
          ui.title('skin', G.t('createTitle'));
          b.appendChild(nameField('herName', st.girl.name, G.t('namePlaceholder'), function (v) { st.girl.name = v; }));
          b.appendChild(U.label(G.t('skin'), 'skin'));
          b.appendChild(U.swatches(G.data.skins, st.girl.skin, function (c) { st.girl.skin = c; draw(); sparkle(300, 400); G.state.save(); }));
          b.appendChild(U.label(G.t('eyes'), 'eye'));
          b.appendChild(U.swatches(G.data.eyeColors, st.girl.eyes, function (c) { st.girl.eyes = c; draw(); sparkle(300, 170); G.state.save(); }));
        } else if (tab === 'hair') {
          ui.title('hair', G.t('hairStyle'));
          b.appendChild(U.grid(G.data.hairStyles, {
            render: function (h) { return G.doll.svg({ girl: { skin: st.girl.skin, eyes: st.girl.eyes, hair: h.id, hairColor: st.girl.hairColor }, makeup: {}, bare: true }, '70 -70 460 460', 'thumb'); },
            isSel: function (h) { return h.id === st.girl.hair; },
            onPick: function (h) { st.girl.hair = h.id; draw(); body(); sparkle(300, 120); G.state.save(); }
          }));
          b.appendChild(U.label(G.t('hairColor'), 'haircolor'));
          b.appendChild(U.swatches(G.data.hairColors, st.girl.hairColor, function (c) { st.girl.hairColor = c; draw(); body(); sparkle(300, 120); G.state.save(); }));
        } else {
          ui.title('pet', G.t('petTitle'));
          b.appendChild(U.grid(G.data.petTypes, {
            cls: 'big',
            render: function (p) { return G.svg.make('0 -40 400 450', G.pet.markup({ pet: { type: p.id, color: st.pet.type === p.id ? st.pet.color : p.color, acc: {}, mud: 0 }, mood: 'happy' }), 'thumb'); },
            isSel: function (p) { return p.id === st.pet.type; },
            onPick: function (p) {
              if (st.pet.type !== p.id) { st.pet.type = p.id; st.pet.color = p.color; }
              G.audio.play(p.sound);
              draw(); body(); sparkle(720, 1000); G.state.save();
            }
          }));
          b.appendChild(nameField('petName', st.pet.name, G.t(st.pet.type === 'puppy' ? 'defaultPuppy' : 'defaultKitten'), function (v) { st.pet.name = v; }));
          b.appendChild(U.label(G.t('petColor'), 'pet'));
          b.appendChild(U.swatches(G.data.petColors, st.pet.color, function (c) { st.pet.color = c; draw(); body(); sparkle(720, 1000); G.state.save(); }));
        }
        foot();
      }

      function finish() {
        if (!st.girl.name) st.girl.name = G.t('defaultGirl');
        if (!st.pet.name) st.pet.name = G.t(st.pet.type === 'puppy' ? 'defaultPuppy' : 'defaultKitten');
        var first = !st.created;
        st.created = true;
        G.state.saveNow();
        if (first) G.fx.confetti();
        G.audio.play('sfx.sparkle');
        G.scenes.go('hub');
      }
      function foot() {
        ui.foot.innerHTML = '';
        var i = tabs.map(function (t) { return t.id; }).indexOf(tab);
        if (edit) {
          ui.foot.appendChild(U.btn({ label: G.t('done'), icon: 'check', onClick: finish }));
        } else if (i < tabs.length - 1) {
          ui.foot.appendChild(U.btn({ label: G.t('next'), icon: 'heart', onClick: function () { tab = tabs[i + 1].id; renderTabs(); body(); } }));
        } else {
          ui.foot.appendChild(U.btn({ label: G.t('letsGo'), icon: 'sparkle', cls: 'gold', onClick: finish }));
        }
      }
      function renderTabs() { U.tabs(ui.tabs, tabs, tab, function (t) { tab = t.id; body(); }); }

      draw(); renderTabs(); body();
    }
  });
})(window.Game);
