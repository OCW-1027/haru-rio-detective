/* engine/voice-pack.js — 事前に 作った 英語音声 (無料の オープンソース音声合成 Kokoro で 生成) を 再生する
 * ファイル: assets/audio/en/<key>.mp3   一覧: assets/audio/en/index.json { k: [key, …] }
 * key = FNV-1a 32bit (role + '|' + 文 の UTF-8) を 16進 8けた。生成スクリプト tools/gen_voice.py と 同じ 計算。
 * 一覧に ない 文・読み込み失敗は false を 返す → 呼び出し側が ブラウザ音声 (speechSynthesis) で 読む。
 * iOS の 自動再生制限を さけるため Audio 要素は 1つを 使い回す。
 */
const VoicePack = (function () {
  const BASE = 'assets/audio/en/';
  let keys = null, A = null, cur = null;
  const enc = typeof TextEncoder !== 'undefined' ? new TextEncoder() : null;
  function key(text, role) {
    const b = enc ? enc.encode((role || 'N') + '|' + String(text).trim()) : [];
    let h = 0x811c9dc5;
    for (let i = 0; i < b.length; i++) { h ^= b[i]; h = Math.imul(h, 0x01000193) >>> 0; }
    return ('0000000' + h.toString(16)).slice(-8);
  }
  function load() {
    try {
      fetch(BASE + 'index.json', { cache: 'no-cache' }).then(r => r.ok ? r.json() : null).then(j => { if (j && j.k) keys = new Set(j.k); }).catch(() => {});
    } catch (e) {}
  }
  function has(text, role) { return !!(keys && keys.has(key(text, role))); }
  function stop() {
    if (cur) { cur.dead = true; cur = null; }
    if (A) { try { A.onended = A.onerror = null; A.pause(); } catch (e) {} }
  }
  // 再生できたら true。onEnd は 再生終了で 呼ぶ。fallback は 再生に 失敗した ときに 呼ぶ (ブラウザ音声へ)
  function play(text, role, rate, onEnd, fallback) {
    if (!has(text, role)) return false;
    stop();
    if (!A) { A = new Audio(); A.preload = 'auto'; }
    const me = { dead: false }; cur = me;
    A.onended = () => { if (!me.dead) { cur = null; if (onEnd) onEnd(); } };
    A.onerror = () => { if (!me.dead) { cur = null; if (fallback) fallback(); else if (onEnd) onEnd(); } };
    A.src = BASE + key(text, role) + '.mp3';
    try { A.playbackRate = rate || 1; A.preservesPitch = true; } catch (e) {}
    const p = A.play();
    if (p && p.catch) p.catch(() => { if (!me.dead) { cur = null; if (fallback) fallback(); else if (onEnd) onEnd(); } });
    return true;
  }
  load();
  return { key: key, has: has, play: play, stop: stop, _ready: () => !!keys, _reload: load };
})();
