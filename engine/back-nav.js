/* engine/back-nav.js — ブラウザの「戻る」(Android の 戻る ジェスチャー・Backspace キー) で アプリから 出ないように する
 * 仕組み: 履歴に 番兵 (sentinel) を 1つ 積んでおき、戻る (popstate) が 来たら 画面内の「← 戻る」ボタンを 押した ことに して、番兵を 積み直す。
 *        タイトル画面に いる ときだけ 本当に 戻る (= アプリを 出る)。
 * Dependencies: なし (index.html の 最後の 方で 読み込む)
 */
(function () {
  // 画面内の 戻る ボタン: 内側の 戻る (単元 → 一覧 など) を 優先、なければ ページの「← 事務所」
  const INNER = ['#mwBack', '.ek-back', '#wqQuit', '#wqMenu', '#imBackT', '#imBack', '#msBack', '.ms-back', '#wcBackCity', '#wcBack', '#wxBack', '#lbBackLab', '#lbBack', '#vlearnBack', '#fqBackToCats', '.game-back-link', '[data-back]'];
  const vis = el => !!el && el.offsetParent !== null && !el.disabled;
  function findBack() {
    const modal = document.getElementById('modalBg');
    if (modal && modal.classList.contains('active')) return { modal: true };
    const page = document.querySelector('.page.active'); if (!page || page.id === 'pageTitle') return null;
    for (const sel of INNER) { const el = [...page.querySelectorAll(sel)].find(vis); if (el) return { el: el }; }
    const pb = [...page.querySelectorAll('.back-btn')].find(vis);
    return pb ? { el: pb } : null;
  }
  function goBack() {
    const b = findBack(); if (!b) return false;
    if (b.modal) { try { closeModal(); } catch (e) {} return true; }
    b.el.click(); return true;
  }
  const arm = () => { try { if (!history.state || !history.state.harucap) history.pushState({ harucap: 1 }, ''); } catch (e) {} };
  try { history.replaceState({ harubase: 1 }, ''); } catch (e) {}
  arm();
  window.addEventListener('popstate', () => {
    if (goBack()) arm();          // 画面内で 1つ 戻って、番兵を 積み直す
    else history.back();          // タイトル画面: 本当に 戻る (アプリを 出る)
  });
  // タイトルから 先へ 進んだら 番兵を 積み直す (クリックの たびに 確認)
  document.addEventListener('click', () => { setTimeout(() => { const p = document.querySelector('.page.active'); if (p && p.id !== 'pageTitle') arm(); }, 0); }, true);
  // Backspace キー (入力欄 以外) も 戻る に する
  document.addEventListener('keydown', e => {
    if (e.key !== 'Backspace' || e.defaultPrevented) return;
    const t = e.target, tag = (t && t.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (t && t.isContentEditable)) return;
    if (goBack()) e.preventDefault();
  });
  window.BackNav = { goBack: goBack, _find: findBack };
})();
