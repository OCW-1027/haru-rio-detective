/* engine/game-v2.js — v2 P3: 별점 + 복습 엔진 (저장 구조 v2)
 * State.v2 = { stars: { <series>: [0~3, ...] }, review: [ {s, c, q, box, due, wrong} ] }
 *   - 기존 저장 데이터(…Cleared 배열)는 그대로 둔다. 별 기록이 없는 클리어는 ⭐3 으로 표시(기존과 동일).
 *   - 복습: 틀린 문제를 기록 → 맞히면 1·3·7·14일 뒤 다시 출제 → 4번 연속 맞히면 졸업.
 * Dependencies: State, saveState, CaseEngine, escapeHtml, sfx
 */
const GameV2 = {
  ensure() {
    if (!State.v2 || typeof State.v2 !== 'object') State.v2 = {};
    if (!State.v2.stars) State.v2.stars = {};
    if (!Array.isArray(State.v2.review)) State.v2.review = [];
    return State.v2;
  },
  getStars(series, idx) {
    const a = this.ensure().stars[series];
    return (a && a[idx]) || 3;
  },
  setStars(series, idx, n) {
    const v = this.ensure();
    if (!v.stars[series]) v.stars[series] = [];
    v.stars[series][idx] = Math.max(v.stars[series][idx] || 0, n);
  },
};

const ReviewEngine = (function () {
  const DAY = 24 * 60 * 60 * 1000;
  const INTERVALS = [1, 3, 7, 14];           // 맞힐 때마다 다음 출제까지의 일수
  function now() { return Date.now(); }
  function list() { return GameV2.ensure().review; }
  function find(s, c, q) { return list().find(r => r.s === s && r.c === c && r.q === q); }

  function record(series, caseIdx, stepIdx) {
    let r = find(series, caseIdx, stepIdx);
    if (!r) { r = { s: series, c: caseIdx, q: stepIdx, box: 0, due: 0, wrong: 0 }; list().push(r); }
    r.wrong++; r.box = 0; r.due = now();
    try { saveState(); } catch (e) {}
  }
  function due(series) {
    const t = now();
    return list().filter(r => (!series || r.s === series) && r.due <= t && question(r));
  }
  function dueCount(series) { return due(series).length; }
  function question(r) {
    const eng = CaseEngine.get(r.s);
    const c = eng && eng.cfg.story[r.c];
    const step = c && c.steps && c.steps[r.q];
    return step && step.puzzle ? { c: c, step: step, title: eng.cfg.title } : null;
  }
  function answer(r, ok) {
    if (ok) {
      r.box++;
      if (r.box > INTERVALS.length) { const i = list().indexOf(r); if (i >= 0) list().splice(i, 1); }
      else r.due = now() + INTERVALS[r.box - 1] * DAY;
    } else { r.wrong++; r.box = 0; r.due = now(); }
    try { saveState(); } catch (e) {}
  }

  // ---- 화면 ----
  function open(series, onClose) {
    const queue = due(series).slice(0, 10);
    if (!queue.length) return;
    let i = 0, okN = 0;
    const ov = document.createElement('div');
    ov.className = 'v2-review-overlay';
    document.body.appendChild(ov);
    function close() { ov.remove(); if (onClose) onClose(); }
    function show() {
      if (i >= queue.length) {
        ov.innerHTML = '<div class="v2-review-card"><div class="v2-review-h">🔁 復習 おわり!</div>' +
          '<div class="v2-review-done">' + queue.length + '問中 ' + okN + '問 正解</div>' +
          '<div class="v2-review-note">正解した 問題は 数日後に もう一度 出てくるよ。</div>' +
          '<button class="sci-next-btn" id="v2RvClose">とじる</button></div>';
        ov.querySelector('#v2RvClose').onclick = close;
        return;
      }
      const r = queue[i], q = question(r), pz = q.step.puzzle;
      let h = '<div class="v2-review-card">';
      h += '<div class="v2-review-h">🔁 復習 ' + (i + 1) + ' / ' + queue.length + '<button class="v2-review-x" id="v2RvX">✕</button></div>';
      h += '<div class="v2-review-src">' + escapeHtml(q.c.title) + ' ・ ' + escapeHtml(q.step.title || '') + '</div>';
      h += '<div class="sci-puzzle-prompt">' + escapeHtml(pz.prompt) + '</div><div class="sci-puzzle-options">';
      pz.options.forEach((o, k) => { h += '<div class="sci-puzzle-opt" data-i="' + k + '">' + (k + 1) + '. ' + escapeHtml(o) + '</div>'; });
      h += '</div><div id="v2RvFb"></div></div>';
      ov.innerHTML = h;
      ov.querySelector('#v2RvX').onclick = close;
      let done = false;
      ov.querySelectorAll('.sci-puzzle-opt').forEach(el => {
        el.onclick = () => {
          if (done) return; done = true;
          const k = parseInt(el.dataset.i), ok = k === pz.answer;
          ov.querySelectorAll('.sci-puzzle-opt').forEach((o, n) => { o.classList.add('answered'); if (n === pz.answer) o.classList.add('correct'); });
          if (!ok) el.classList.add('wrong');
          try { sfx(ok ? 'unlock' : 'wrong'); } catch (e) {}
          if (ok) okN++;
          answer(r, ok);
          ov.querySelector('#v2RvFb').innerHTML = '<div class="sci-feedback ' + (ok ? 'ok' : 'ng') + '"><div class="sci-feedback-h ' + (ok ? 'ok' : 'ng') + '">' +
            (ok ? '🎉 正解!' : '✗ ざんねん…') + '</div><div class="sci-feedback-text">' + escapeHtml(pz.explanation || '') + '</div></div>' +
            '<button class="sci-next-btn" id="v2RvNext">' + (i + 1 < queue.length ? '次の 問題 →' : '結果を 見る') + '</button>';
          ov.querySelector('#v2RvNext').onclick = () => { i++; show(); };
        };
      });
    }
    show();
  }

  return { record: record, due: due, dueCount: dueCount, open: open, answer: answer, _find: find };
})();
