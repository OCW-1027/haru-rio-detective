/* engine/furigana.js — むずかしい 漢字に 自動で ふりがな (ルビ) を つける
 *
 * - 4年生 以上で 習う 漢字 (と 常用外の 漢字) を ふくむ 語に、画面に 表示された ときに <ruby> を つける。
 * - 辞書は data/furigana-dict.json (tools/furigana/ (build_raw.py → finalize.py) で ゲーム内の 文章 全体から 作成)。
 *   { "縄文": [["縄文","じょうもん"]], "驚か": [["驚","おどろ"],"か"], ... }
 * - 元の データ (問題文・答え) は 変えない。表示だけ 変える ので 答え合わせには 影響しない。
 * - 右下の 設定や 事務所の ボタンで ON/OFF (localStorage 'harugame_furigana')。
 */
(function () {
  const KEY = 'harugame_furigana';
  const SKIP = new Set(['RUBY', 'RT', 'RP', 'SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT', 'SELECT', 'OPTION', 'CODE', 'PRE', 'SVG', 'svg', 'NOSCRIPT', 'text']);
  const SKIP_SEL = '.no-furi, [contenteditable="true"], .chat-modal, .chat-entry-btn, [class^="chat-"]';
  const HASK = /[一-鿿々]/;
  let IDX = null, ready = false, queue = new Set(), raf = 0;

  function on() { try { return localStorage.getItem(KEY) !== 'off'; } catch (e) { return true; } }
  function apply() { document.documentElement.classList.toggle('furi-off', !on()); }

  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function build(dict) {
    IDX = new Map();
    Object.keys(dict).forEach(sf => {
      const parts = dict[sf];
      const html = parts.map(p => typeof p === 'string' ? esc(p) : '<ruby>' + esc(p[0]) + '<rt>' + esc(p[1]) + '</rt></ruby>').join('');
      const c = sf[0];
      if (!IDX.has(c)) IDX.set(c, []);
      IDX.get(c).push([sf, html]);
    });
    IDX.forEach(a => a.sort((x, y) => y[0].length - x[0].length));
  }

  function skipNode(el) {
    for (let e = el; e && e !== document.body; e = e.parentElement) {
      if (SKIP.has(e.nodeName)) return true;
      if (e.matches && e.matches(SKIP_SEL)) return true;
    }
    return false;
  }

  function convert(text) {
    let out = '', last = 0, hit = false;
    for (let i = 0; i < text.length;) {
      const cands = IDX.get(text[i]);
      let m = null;
      if (cands) for (const c of cands) { if (text.startsWith(c[0], i)) { m = c; break; } }
      if (m) { out += esc(text.slice(last, i)) + m[1]; i += m[0].length; last = i; hit = true; }
      else i++;
    }
    if (!hit) return null;
    return out + esc(text.slice(last));
  }

  function processRoot(root) {
    if (!ready || !root) return;
    if (root.nodeType === 3) { doText(root); return; }
    if (root.nodeType !== 1 || skipNode(root)) return;
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: n => HASK.test(n.nodeValue) && !skipNode(n.parentElement) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT,
    });
    const list = []; let n;
    while ((n = w.nextNode())) list.push(n);
    list.forEach(doText);
  }
  function doText(t) {
    if (!t.parentNode || !HASK.test(t.nodeValue) || skipNode(t.parentElement)) return;
    const h = convert(t.nodeValue);
    if (h === null) return;
    const tpl = document.createElement('template');
    tpl.innerHTML = h;
    t.parentNode.replaceChild(tpl.content, t);
  }

  function flush() {
    raf = 0;
    const nodes = Array.from(queue); queue.clear();
    nodes.forEach(n => { if (n.isConnected) processRoot(n); });
  }
  function enqueue(n) { queue.add(n); if (!raf) raf = requestAnimationFrame(flush); }

  function start() {
    apply();
    fetch('data/furigana-dict.json').then(r => r.json()).then(d => {
      build(d); ready = true;
      processRoot(document.body);
      new MutationObserver(ms => {
        ms.forEach(m => {
          if (m.type === 'characterData') { if (m.target.parentElement && m.target.parentElement.nodeName !== 'RT') enqueue(m.target); return; }
          m.addedNodes.forEach(a => { if (a.nodeType === 1 && (a.nodeName === 'RUBY' || a.nodeName === 'RT')) return; enqueue(a); });
        });
      }).observe(document.body, { childList: true, subtree: true, characterData: true });
    }).catch(e => console.warn('[furigana] dict load failed', e));
  }

  window.Furigana = {
    isOn: on,
    set(v) { try { localStorage.setItem(KEY, v ? 'on' : 'off'); } catch (e) {} apply(); },
    toggle() { this.set(!on()); return on(); },
    convert: (s) => (ready ? convert(s) : null),
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
