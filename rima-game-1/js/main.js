/* Start-up: load the save, build the reward table, show the title screen. */
(function (G) {
  'use strict';

  G.boot = function () {
    G.state.load();
    document.documentElement.lang = G.i18n.lang();
    G.unlocks.build();
    G.audio.setMuted(G.state.data.muted);

    // browsers only allow sound after the first tap or key press
    var unlock = function () { G.audio.unlock(); };
    document.addEventListener('pointerdown', unlock, true);
    document.addEventListener('keydown', unlock, true);

    // Escape closes the top popup
    document.addEventListener('keydown', function (ev) {
      if (ev.key !== 'Escape') return;
      var ov = document.getElementById('overlay'), last = ov.lastElementChild;
      if (!last) return;
      var b = last.querySelector('.popup-foot button');
      if (b) b.click();
    });

    G.scenes.go('title');
    if (!G.state.storageOk) G.ui.toast(G.t('storageWarn'));
  };
})(window.Game);
