/* Pointer interactions (mouse and touch share one code path):
     G.drag.rub   hold a tool and rub it over the picture
     G.drag.move  drag an object around inside an SVG, or tap it */
(function (G) {
  'use strict';

  var D = G.drag = {
    /* Rub interaction on `target` (usually the stage <svg>).
       opts:
         ref      element whose coordinate system the callbacks use (default: target)
         tool     icon name shown under the pointer, e.g. 'blush' (optional)
         onStart(p), onRub(p, dist), onEnd(), onTap(p)
       p = { x, y } in ref coordinates, plus cx, cy in screen coordinates.
       Returns { off(), setTool(icon) }. */
    rub: function (target, opts) {
      var ref = opts.ref || target, down = false, last = null, moved = 0, cursor = null, toolName = null;

      function point(ev) {
        var p = G.svg.pt(typeof ref === 'function' ? ref() : ref, ev.clientX, ev.clientY);
        p.cx = ev.clientX; p.cy = ev.clientY;
        return p;
      }
      function place(ev) {
        if (!cursor) return;
        cursor.style.transform = 'translate(' + ev.clientX + 'px,' + ev.clientY + 'px)';
        cursor.style.opacity = '1';
      }
      function setTool(name) {
        toolName = name;
        if (cursor) { cursor.remove(); cursor = null; }
        if (!name) return;
        cursor = G.icon(name, 'tool-cursor');
        cursor.style.opacity = '0';
        document.body.appendChild(cursor);
      }
      function onDown(ev) {
        if (ev.button != null && ev.button > 0) return;
        down = true; moved = 0; last = point(ev);
        try { target.setPointerCapture(ev.pointerId); } catch (e) {}
        place(ev);
        if (cursor) cursor.classList.add('rubbing');
        G.audio.unlock();
        if (opts.onStart) opts.onStart(last);
        ev.preventDefault();
      }
      function onMove(ev) {
        place(ev);
        if (!down) return;
        var p = point(ev), dx = p.x - last.x, dy = p.y - last.y, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 0.5) return;
        moved += dist; last = p;
        if (opts.onRub) opts.onRub(p, dist);
      }
      function onUp(ev) {
        if (!down) return;
        down = false;
        if (cursor) { cursor.classList.remove('rubbing'); if (ev.pointerType === 'touch') cursor.style.opacity = '0'; }
        if (moved < 6 && opts.onTap) opts.onTap(point(ev));
        if (opts.onEnd) opts.onEnd();
      }
      function onLeave() { if (cursor && !down) cursor.style.opacity = '0'; }

      target.addEventListener('pointerdown', onDown);
      target.addEventListener('pointermove', onMove);
      target.addEventListener('pointerup', onUp);
      target.addEventListener('pointercancel', onUp);
      target.addEventListener('pointerleave', onLeave);
      if (opts.tool) setTool(opts.tool);

      return {
        setTool: setTool,
        off: function () {
          target.removeEventListener('pointerdown', onDown);
          target.removeEventListener('pointermove', onMove);
          target.removeEventListener('pointerup', onUp);
          target.removeEventListener('pointercancel', onUp);
          target.removeEventListener('pointerleave', onLeave);
          if (cursor) cursor.remove();
        }
      };
    },

    /* Make an SVG element draggable.
       opts: svg (the <svg> whose user units are used), get() -> {x, y}, set(x, y), onStart(), onEnd(moved), onTap()
       Returns off(). */
    move: function (elm, opts) {
      var start = null, origin = null, moved = false;
      function onDown(ev) {
        if (ev.button != null && ev.button > 0) return;
        start = G.svg.pt(opts.svg, ev.clientX, ev.clientY);
        origin = opts.get(); moved = false;
        try { elm.setPointerCapture(ev.pointerId); } catch (e) {}
        G.audio.unlock();
        if (opts.onStart) opts.onStart();
        ev.preventDefault(); ev.stopPropagation();
      }
      function onMove(ev) {
        if (!start) return;
        var p = G.svg.pt(opts.svg, ev.clientX, ev.clientY), dx = p.x - start.x, dy = p.y - start.y;
        if (!moved && Math.abs(dx) + Math.abs(dy) < 5) return;
        moved = true;
        opts.set(origin.x + dx, origin.y + dy);
      }
      function onUp() {
        if (!start) return;
        start = null;
        if (!moved && opts.onTap) opts.onTap();
        if (opts.onEnd) opts.onEnd(moved);
      }
      elm.addEventListener('pointerdown', onDown);
      elm.addEventListener('pointermove', onMove);
      elm.addEventListener('pointerup', onUp);
      elm.addEventListener('pointercancel', onUp);
      elm.classList.add('movable');
      return function () {
        elm.removeEventListener('pointerdown', onDown);
        elm.removeEventListener('pointermove', onMove);
        elm.removeEventListener('pointerup', onUp);
        elm.removeEventListener('pointercancel', onUp);
      };
    }
  };
})(window.Game);
