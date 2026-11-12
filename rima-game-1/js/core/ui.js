/* Shared interface widgets: buttons, tabs, item grids, color and pattern pickers, popups, toasts. */
(function (G) {
  'use strict';
  var A = G.assets;

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  var U = G.ui = {
    el: el,

    /* Glossy button. opts: icon, label, cls, title, sound, onClick */
    btn: function (opts) {
      var b = el('button', 'gbtn ' + (opts.cls || ''));
      b.type = 'button';
      if (opts.icon) b.appendChild(G.icon(opts.icon));
      if (opts.label) { var s = el('span'); s.textContent = opts.label; b.appendChild(s); }
      var title = opts.title || opts.label;
      if (title) { b.title = title; b.setAttribute('aria-label', title); }
      if (opts.onClick) b.addEventListener('click', function (ev) { G.audio.play(opts.sound || 'sfx.click'); opts.onClick(ev, b); });
      return b;
    },

    /* The standard two-part screen: stage (picture) + panel (controls). */
    layout: function (root, opts) {
      opts = opts || {};
      var split = el('div', 'split ' + (opts.cls || ''));
      var stage = el('div', 'stage ' + (opts.stageCls || ''));
      var top = el('div', 'stage-top'), bottom = el('div', 'stage-bottom'), hint = el('div', 'hint');
      stage.appendChild(top); stage.appendChild(bottom); stage.appendChild(hint);
      var panel = el('div', 'panel');
      var head = el('div', 'panel-head'), tabs = el('div', 'tabs'), body = el('div', 'panel-body'), foot = el('div', 'panel-foot');
      panel.appendChild(head); panel.appendChild(tabs); panel.appendChild(body); panel.appendChild(foot);
      split.appendChild(stage); split.appendChild(panel);
      root.appendChild(split);
      return {
        stage: stage, top: top, bottom: bottom, panel: panel, head: head, tabs: tabs, body: body, foot: foot,
        hint: function (text) { hint.textContent = text || ''; },
        title: function (icon, text) { head.innerHTML = ''; if (icon) head.appendChild(G.icon(icon)); var s = el('span'); s.textContent = text; head.appendChild(s); }
      };
    },

    /* Row of icon tabs. items: [{id, icon, name}] */
    tabs: function (box, items, current, onPick) {
      box.innerHTML = '';
      items.forEach(function (it) {
        var b = el('button', 'tab' + (it.id === current ? ' sel' : '') + (it.done ? ' done' : ''));
        b.type = 'button';
        b.title = G.tn(it.name); b.setAttribute('aria-label', G.tn(it.name));
        b.appendChild(it.thumb ? it.thumb() : G.icon(it.icon));
        b.addEventListener('click', function () {
          G.audio.play('sfx.tab');
          Array.prototype.forEach.call(box.children, function (c) { c.classList.remove('sel'); });
          b.classList.add('sel');
          onPick(it);
        });
        box.appendChild(b);
        if (it.id === current) setTimeout(function () { if (b.scrollIntoView) b.scrollIntoView({ block: 'nearest', inline: 'nearest' }); }, 0);
      });
    },

    /* Grid of picture tiles.
       opts: render(item) -> node, isSel(item), lockOf(item) -> stars needed (0 = free), onPick(item, tile), cls, tileCls, label(item) */
    grid: function (items, opts) {
      var g = el('div', 'grid ' + (opts.cls || ''));
      items.forEach(function (it) {
        var need = opts.lockOf ? opts.lockOf(it) : 0;
        var t = el('button', 'tile ' + (opts.tileCls || '') + (opts.isSel && opts.isSel(it) ? ' sel' : '') + (need ? ' locked' : ''));
        t.type = 'button';
        var name = opts.label ? opts.label(it) : G.tn(it.name);
        if (name) { t.title = name; t.setAttribute('aria-label', name); }
        var pic = opts.render(it);
        if (pic) t.appendChild(pic);
        if (need) {
          var lock = el('div', 'lock');
          lock.appendChild(G.icon('lock'));
          var n = el('span'); n.appendChild(G.icon('star')); n.appendChild(document.createTextNode(need)); lock.appendChild(n);
          t.appendChild(lock);
        }
        t.addEventListener('click', function () {
          if (need) {
            G.audio.play('sfx.trash');
            t.classList.remove('shake'); void t.offsetWidth; t.classList.add('shake');
            U.toast(G.t('locked', { n: need }), 'lock');
            return;
          }
          G.audio.play('sfx.pick');
          opts.onPick(it, t);
        });
        g.appendChild(t);
      });
      return g;
    },

    /* Tile that means "nothing in this slot". */
    noneTile: function (grid, selected, onPick) {
      var t = el('button', 'tile none' + (selected ? ' sel' : ''));
      t.type = 'button'; t.title = G.t('none'); t.setAttribute('aria-label', G.t('none'));
      t.appendChild(G.icon('close'));
      t.addEventListener('click', function () { G.audio.play('sfx.trash'); onPick(); });
      grid.insertBefore(t, grid.firstChild);
      return t;
    },

    /* Color swatches. */
    swatches: function (colors, current, onPick) {
      var box = el('div', 'swatches');
      colors.forEach(function (c) {
        var s = el('button', 'swatch' + (current && c.toLowerCase() === String(current).toLowerCase() ? ' sel' : ''));
        s.type = 'button'; s.style.background = c; s.title = c; s.setAttribute('aria-label', G.t('color') + ' ' + c);
        s.addEventListener('click', function () {
          G.audio.play('sfx.pick');
          Array.prototype.forEach.call(box.children, function (x) { x.classList.remove('sel'); });
          s.classList.add('sel');
          onPick(c);
        });
        box.appendChild(s);
      });
      return box;
    },

    /* Pattern swatches, drawn in the given color. */
    patterns: function (current, color, onPick) {
      var box = el('div', 'swatches');
      G.patterns.list.forEach(function (p) {
        var need = G.unlocks.need('pattern.' + p.id);
        var s = el('button', 'swatch pat' + ((current || 'solid') === p.id ? ' sel' : '') + (need ? ' locked' : ''));
        s.type = 'button'; s.title = p.id; s.setAttribute('aria-label', G.t('pattern') + ' ' + p.id);
        s.appendChild(G.svg.make('0 0 60 60', '<rect width="60" height="60" fill="' + G.patterns.fill(p.id, color, 0.7) + '"/>'));
        s.addEventListener('click', function () {
          if (need) { G.audio.play('sfx.trash'); U.toast(G.t('locked', { n: need }), 'lock'); return; }
          G.audio.play('sfx.pick');
          Array.prototype.forEach.call(box.children, function (x) { x.classList.remove('sel'); });
          s.classList.add('sel');
          onPick(p.id);
        });
        box.appendChild(s);
      });
      return box;
    },

    label: function (text, icon) {
      var l = el('div', 'label');
      if (icon) { var i = G.icon(icon); i.style.width = '18px'; i.style.height = '18px'; l.appendChild(i); }
      l.appendChild(document.createTextNode(text));
      return l;
    },
    note: function (text) { var n = el('div', 'note'); n.textContent = text; return n; },

    starsRow: function (n, big) {
      var r = el('div', 'stars-row' + (big ? ' big' : ''));
      for (var i = 1; i <= 3; i++) {
        var ic = G.icon(i <= n ? 'star' : 'starempty');
        if (big && i <= n) { ic.classList.add('pop'); ic.style.animationDelay = (0.15 + i * 0.25) + 's'; }
        r.appendChild(ic);
      }
      return r;
    },

    /* Modal popup. opts: title, body (node, array of nodes, or text), buttons [{label, icon, cls, onClick, keep}], cls, onClose */
    popup: function (opts) {
      var ov = document.getElementById('overlay');
      var p = el('div', 'popup ' + (opts.cls || ''));
      p.setAttribute('role', 'dialog'); p.setAttribute('aria-modal', 'true');
      if (opts.title) { var t = el('div', 'popup-title'); t.textContent = opts.title; p.appendChild(t); }
      var body = el('div', 'popup-body');
      [].concat(opts.body || []).forEach(function (b) { if (typeof b === 'string') { var d = el('div'); d.textContent = b; body.appendChild(d); } else if (b) body.appendChild(b); });
      p.appendChild(body);
      var api = {
        el: p, body: body,
        close: function () {
          if (!p.parentNode) return;
          p.remove();
          if (!ov.children.length) ov.classList.remove('open');
          if (opts.onClose) opts.onClose();
        }
      };
      var foot = el('div', 'popup-foot');
      (opts.buttons || [{ label: G.t('ok'), icon: 'check' }]).forEach(function (b) {
        foot.appendChild(U.btn({ label: b.label, icon: b.icon, cls: b.cls, onClick: function () { if (!b.keep) api.close(); if (b.onClick) b.onClick(api); } }));
      });
      p.appendChild(foot);
      ov.appendChild(p);
      ov.classList.add('open');
      var first = foot.querySelector('button');
      if (first) first.focus();
      return api;
    },
    closePopups: function () {
      var ov = document.getElementById('overlay');
      ov.innerHTML = ''; ov.classList.remove('open');
    },

    confirm: function (text, onYes) {
      U.popup({ body: text, buttons: [{ label: G.t('no'), icon: 'close', cls: 'ghost' }, { label: G.t('yes'), icon: 'check', onClick: onYes }] });
    },

    toast: function (text, icon) {
      Array.prototype.forEach.call(document.querySelectorAll('.toast'), function (t) { t.remove(); });
      var t = el('div', 'toast');
      t.setAttribute('role', 'status');
      if (icon) t.appendChild(G.icon(icon));
      t.appendChild(document.createTextNode(text));
      document.body.appendChild(t);
      setTimeout(function () { t.remove(); }, 2500);
    },

    /* Small standalone picture of an asset for tiles. */
    thumb: function (id, o, view) { return A.thumb(id, o, view, 'thumb'); }
  };
})(window.Game);
