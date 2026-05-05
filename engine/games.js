/* engine/games.js — extracted from index.html (v73 step4a)
 * Original locations: lines 3404-3514 (GAME SYSTEM), 8325-9106 (mini-games)
 * Contents: GAME SYSTEM (GAMES, CurrentGame, buildGameGrid, startGame, tryRetryGame), MINI-GAMES UTIL (stopGame, recordGameBest), 4 MINI-GAMES (startRacingGame, startBreakerGame, start2048Game, startMazeGame)
 * Dependencies: State, sfx, showModal, showPage, saveState
 */
// ============================================================
// 🎮 게임 시스템 - v28
// ============================================================
const GAMES = [
  { id: 'racing',  icon: '🏎️', name: 'レーシング', desc: '車を 動かして 障害物を よけよう' },
  { id: 'breaker', icon: '🧱', name: 'ブロック崩し', desc: 'ボールで ブロックを ぜんぶ 壊そう' },
  { id: '2048',    icon: '🔢', name: '2048',         desc: '同じ数字を 合体して 2048を 目指そう' },
  { id: 'maze',    icon: '🌀', name: '迷路',          desc: 'スタートから ゴールへ!' },
];

function buildGameGrid(grid) {
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'grid-column:1/-1;';
  if (!State.gameStats) State.gameStats = {};

  // v74: 토큰 정보 (3장 클리어마다 +1)
  const tokens = State.gameTokens || 0;
  const clearCount = State.engClearCount || 0;
  const remaining = 3 - (clearCount % 3);
  const remainingText = (remaining < 3 && clearCount > 0) ? remaining : 3;

  let html = '<div class="game-header">';
  html += '<div class="game-title">🎮 ゲーム センター</div>';
  html += '<div style="font-size:13px;color:#4a8a4a;margin-top:4px;font-family:Klee One;">勉強の あいまに リフレッシュ!</div>';
  html += '</div>';
  // 토큰 표시 패널
  html += '<div style="background:white;border:3px solid #4a8a4a;border-radius:14px;padding:14px 18px;margin-bottom:14px;text-align:center;">';
  html += '<div style="font-family:RocknRoll One;font-size:18px;color:#2a5a2a;">';
  html += '🎮 ゲームトークン: <span style="color:#c4625e;">' + tokens + '</span> 個';
  html += '</div>';
  if (tokens === 0) {
    html += '<div style="font-size:12px;color:#7a3a3a;margin-top:6px;font-family:Klee One;">';
    html += '⚠️ トークンが ありません!<br>';
    html += '英語チャレンジを <strong>あと ' + remainingText + ' 章</strong> クリアして トークンを GET!';
    html += '</div>';
  } else {
    html += '<div style="font-size:12px;color:#4a8a4a;margin-top:6px;font-family:Klee One;">';
    html += '1回 プレイで トークン -1<br>';
    html += '英語 3章 クリアで トークン +1 (累計 ' + clearCount + '章 クリア済み)';
    html += '</div>';
  }
  html += '</div>';

  html += '<div class="game-grid-menu">';
  GAMES.forEach(g => {
    const best = (State.gameStats[g.id] && State.gameStats[g.id].best) || 0;
    const bestText = best > 0 ? '🏆 ベスト: ' + best : '';
    const locked = tokens === 0;
    html += '<div class="game-card' + (locked ? ' game-locked' : '') + '" data-game="' + g.id + '">';
    html += '<span class="game-card-icon">' + g.icon + '</span>';
    html += '<div class="game-card-name">' + g.name + '</div>';
    html += '<div class="game-card-desc">' + g.desc + '</div>';
    if (bestText) html += '<div class="game-card-best">' + bestText + '</div>';
    if (locked) html += '<div style="position:absolute;top:8px;right:8px;font-size:24px;">🔒</div>';
    html += '</div>';
  });
  html += '</div>';
  wrapper.innerHTML = html;
  grid.appendChild(wrapper);

  wrapper.querySelectorAll('.game-card').forEach(card => {
    card.onclick = () => {
      if (card.classList.contains('game-locked')) {
        sfx('wrong');
        showModal('🔒', 'ロック中', 'ゲームトークンが ありません。\n\n英語チャレンジを ' + remainingText + ' 章 クリアすると トークンが もらえます!',
          [{text:'OK', cb:closeModal}], 'fail');
        return;
      }
      sfx('click');
      const gid = card.dataset.game;
      startGame(gid);
    };
  });
}

let CurrentGame = null; // 게임 정리용

function startGame(gid) {
  // v30: 토큰 검사
  if ((State.gameTokens || 0) <= 0) {
    showModal('🔒', 'トークン不足', 'ゲームトークンが ありません。\n英語を 3章 クリアして トークンを GET!',
      [{text:'OK', cb:closeModal}], 'fail');
    return;
  }
  // 토큰 소비
  State.gameTokens--;
  State.tokensUsed = (State.tokensUsed || 0) + 1;
  saveState();
  // 이전 게임 정리
  stopGame();
  showPage('pageGame');
  if (gid === 'racing')  startRacingGame();
  else if (gid === 'breaker') startBreakerGame();
  else if (gid === '2048')    start2048Game();
  else if (gid === 'maze')    startMazeGame();
}

// v30: 「もう一度」 토큰 소비 헬퍼 - 토큰 없으면 메뉴로
function tryRetryGame(gameStartFn) {
  if ((State.gameTokens || 0) <= 0) {
    showModal('🔒', 'トークン不足', 'もう一度 プレイするには トークンが 必要です。\n英語を もっと クリアしよう!',
      [{text:'メニューへ', cb:() => { closeModal(); stopGame(); buildChapterGrid(); showPage('pageSelect'); }}], 'fail');
    return;
  }
  State.gameTokens--;
  State.tokensUsed = (State.tokensUsed || 0) + 1;
  saveState();
  stopGame();
  gameStartFn();
}


function stopGame() {
  if (CurrentGame) {
    if (CurrentGame.cleanup) CurrentGame.cleanup();
    CurrentGame = null;
  }
}

function recordGameBest(gid, score) {
  if (!State.gameStats) State.gameStats = {};
  if (!State.gameStats[gid]) State.gameStats[gid] = { best: 0 };
  if (score > State.gameStats[gid].best) {
    State.gameStats[gid].best = score;
    saveState();
    return true;
  }
  return false;
}

// ============================================================
// 🏎️ 레이싱 게임
// ============================================================
function startRacingGame() {
  const area = document.getElementById('gameArea');
  let html = '<div class="game-header"><div class="game-title">🏎️ レーシング</div></div>';
  html += '<div class="game-instruction">⬅️ ➡️ で 車を 動かす / 障害物に ぶつからないで!</div>';
  html += '<div class="game-hud">';
  html += '<div class="game-hud-item">📏 <span id="racingDist">0</span> m</div>';
  html += '<div class="game-hud-item">⚡ レベル <span id="racingLevel">1</span></div>';
  html += '<button class="game-back-link" id="racingExit">やめる</button>';
  html += '</div>';
  html += '<div class="game-canvas-wrap" style="width:300px;">';
  html += '<canvas id="racingCanvas" width="300" height="450" style="display:block;background:#444;"></canvas>';
  html += '</div>';
  html += '<div class="game-touch-controls" style="max-width:300px;margin-left:auto;margin-right:auto;">';
  html += '<button class="game-touch-btn" id="racingLeft">◀</button>';
  html += '<button class="game-touch-btn" id="racingRight" style="grid-column:3;">▶</button>';
  html += '</div>';
  area.innerHTML = html;

  const canvas = document.getElementById('racingCanvas');
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const LANES = 3;
  const LANE_W = W / LANES;
  const CAR_W = 38, CAR_H = 60;
  const game = {
    playerLane: 1,
    playerX: LANE_W * 1 + LANE_W/2 - CAR_W/2,
    obstacles: [],  // {lane, y, color}
    distance: 0,
    speed: 4,
    level: 1,
    spawnTimer: 0,
    spawnInterval: 60,
    roadOffset: 0,
    over: false,
    raf: null,
  };
  CurrentGame = game;

  function moveLane(dir) {
    if (game.over) return;
    game.playerLane = Math.max(0, Math.min(LANES - 1, game.playerLane + dir));
    game.playerX = LANE_W * game.playerLane + LANE_W/2 - CAR_W/2;
  }

  // 키보드 + 터치
  game.keyHandler = (e) => {
    if (e.key === 'ArrowLeft') moveLane(-1);
    else if (e.key === 'ArrowRight') moveLane(1);
  };
  document.addEventListener('keydown', game.keyHandler);
  document.getElementById('racingLeft').onclick = () => moveLane(-1);
  document.getElementById('racingRight').onclick = () => moveLane(1);
  document.getElementById('racingExit').onclick = () => {
    stopGame();
    buildChapterGrid(); showPage('pageSelect');
  };

  function update() {
    if (game.over) return;
    game.distance += game.speed;
    game.roadOffset = (game.roadOffset + game.speed) % 40;
    // 레벨 업
    const newLevel = Math.floor(game.distance / 1000) + 1;
    if (newLevel > game.level) {
      game.level = newLevel;
      game.speed = Math.min(12, 4 + (newLevel - 1) * 1.2);
      game.spawnInterval = Math.max(25, 60 - (newLevel - 1) * 4);
    }
    // 장애물 생성
    game.spawnTimer++;
    if (game.spawnTimer >= game.spawnInterval) {
      game.spawnTimer = 0;
      const lane = Math.floor(Math.random() * LANES);
      const color = ['#e07b5e', '#f0c674', '#9b87bc', '#6fb074'][Math.floor(Math.random() * 4)];
      game.obstacles.push({ lane, y: -CAR_H, color });
    }
    // 장애물 이동
    game.obstacles.forEach(o => o.y += game.speed);
    // 충돌 체크
    const playerY = H - CAR_H - 20;
    game.obstacles.forEach(o => {
      const ox = LANE_W * o.lane + LANE_W/2 - CAR_W/2;
      if (o.lane === game.playerLane &&
          o.y + CAR_H > playerY &&
          o.y < playerY + CAR_H) {
        game.over = true;
      }
    });
    // 화면 밖 제거
    game.obstacles = game.obstacles.filter(o => o.y < H + CAR_H);
  }

  function draw() {
    // 배경 (도로)
    ctx.fillStyle = '#444';
    ctx.fillRect(0, 0, W, H);
    // 차선
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.setLineDash([20, 20]);
    for (let i = 1; i < LANES; i++) {
      ctx.beginPath();
      ctx.moveTo(LANE_W * i, -game.roadOffset);
      ctx.lineTo(LANE_W * i, H);
      ctx.stroke();
    }
    ctx.setLineDash([]);
    // 가장자리 (잔디)
    ctx.fillStyle = '#2a5a2a';
    ctx.fillRect(0, 0, 6, H);
    ctx.fillRect(W - 6, 0, 6, H);
    // 장애물
    game.obstacles.forEach(o => {
      const x = LANE_W * o.lane + LANE_W/2 - CAR_W/2;
      ctx.fillStyle = o.color;
      ctx.fillRect(x, o.y, CAR_W, CAR_H);
      ctx.fillStyle = '#222';
      ctx.fillRect(x + 4, o.y + 8, CAR_W - 8, 12);
      ctx.fillRect(x + 4, o.y + CAR_H - 20, CAR_W - 8, 12);
    });
    // 플레이어
    ctx.fillStyle = '#3a7ac8';
    ctx.fillRect(game.playerX, H - CAR_H - 20, CAR_W, CAR_H);
    ctx.fillStyle = '#fff';
    ctx.fillRect(game.playerX + 4, H - CAR_H - 12, CAR_W - 8, 12);
    ctx.fillRect(game.playerX + 4, H - 32, CAR_W - 8, 12);
    // HUD 갱신
    document.getElementById('racingDist').textContent = Math.floor(game.distance / 10);
    document.getElementById('racingLevel').textContent = game.level;
    // 게임 오버 화면
    if (game.over) {
      const wrap = canvas.parentElement;
      let ov = wrap.querySelector('.game-overlay');
      if (!ov) {
        ov = document.createElement('div');
        ov.className = 'game-overlay';
        const score = Math.floor(game.distance / 10);
        const isBest = recordGameBest('racing', score);
        ov.innerHTML = '<div class="game-overlay-title">💥 GAME OVER</div>' +
          '<div class="game-overlay-score">' + score + ' m' + (isBest ? ' 🏆 NEW!' : '') + '</div>' +
          '<button class="game-overlay-btn" id="racingRetry">もう一度</button>' +
          '<button class="game-overlay-btn" id="racingMenu" style="background:#7a4a8a;margin-top:8px;">メニュー</button>';
        wrap.appendChild(ov);
        document.getElementById('racingRetry').onclick = () => tryRetryGame(startRacingGame);
        document.getElementById('racingMenu').onclick = () => { stopGame(); buildChapterGrid(); showPage('pageSelect'); };
      }
    }
  }

  function loop() {
    if (!game.over) update();
    draw();
    if (!game.over) game.raf = requestAnimationFrame(loop);
  }
  loop();

  game.cleanup = () => {
    if (game.raf) cancelAnimationFrame(game.raf);
    document.removeEventListener('keydown', game.keyHandler);
  };
}

// ============================================================
// 🧱 벽돌 깨기
// ============================================================
function startBreakerGame() {
  const area = document.getElementById('gameArea');
  let html = '<div class="game-header"><div class="game-title">🧱 ブロック崩し</div></div>';
  html += '<div class="game-instruction">⬅️ ➡️ で パドルを 動かす / 全部の ブロックを 壊そう!</div>';
  html += '<div class="game-hud">';
  html += '<div class="game-hud-item">⭐ <span id="brkScore">0</span></div>';
  html += '<div class="game-hud-item">❤️ <span id="brkLives">3</span></div>';
  html += '<div class="game-hud-item">🎯 LV<span id="brkLevel">1</span></div>';
  html += '<button class="game-back-link" id="brkExit">やめる</button>';
  html += '</div>';
  html += '<div class="game-canvas-wrap" style="width:340px;">';
  html += '<canvas id="brkCanvas" width="340" height="450" style="display:block;background:#1a1a2e;"></canvas>';
  html += '</div>';
  html += '<div class="game-touch-controls" style="max-width:340px;margin-left:auto;margin-right:auto;">';
  html += '<button class="game-touch-btn" id="brkLeft">◀</button>';
  html += '<button class="game-touch-btn" id="brkRight" style="grid-column:3;">▶</button>';
  html += '</div>';
  area.innerHTML = html;

  const canvas = document.getElementById('brkCanvas');
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const game = {
    paddle: { x: W/2 - 40, y: H - 20, w: 80, h: 10 },
    ball: { x: W/2, y: H - 35, dx: 3, dy: -3, r: 6 },
    bricks: [],
    score: 0,
    lives: 3,
    level: 1,
    moving: { left: false, right: false },
    over: false, won: false,
    raf: null,
  };
  CurrentGame = game;

  function buildBricks(level) {
    const cols = 8;
    const rows = 4 + Math.min(level - 1, 3);
    const padding = 4;
    const bw = (W - (cols + 1) * padding) / cols;
    const bh = 18;
    const colors = ['#e07b5e', '#f0c674', '#6fb074', '#6ba8c4', '#9b87bc', '#c45e8e', '#5ea8c4'];
    const bricks = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        bricks.push({
          x: padding + c * (bw + padding),
          y: 30 + r * (bh + padding),
          w: bw, h: bh,
          color: colors[r % colors.length],
          alive: true,
        });
      }
    }
    return bricks;
  }
  game.bricks = buildBricks(game.level);

  game.keyDown = (e) => {
    if (e.key === 'ArrowLeft')  game.moving.left = true;
    if (e.key === 'ArrowRight') game.moving.right = true;
  };
  game.keyUp = (e) => {
    if (e.key === 'ArrowLeft')  game.moving.left = false;
    if (e.key === 'ArrowRight') game.moving.right = false;
  };
  document.addEventListener('keydown', game.keyDown);
  document.addEventListener('keyup', game.keyUp);

  // 터치 (누르고 있는 동안)
  const lBtn = document.getElementById('brkLeft');
  const rBtn = document.getElementById('brkRight');
  const onPress = (key, val) => () => { game.moving[key] = val; };
  lBtn.addEventListener('touchstart', onPress('left', true));
  lBtn.addEventListener('touchend',   onPress('left', false));
  lBtn.addEventListener('mousedown',  onPress('left', true));
  lBtn.addEventListener('mouseup',    onPress('left', false));
  lBtn.addEventListener('mouseleave', onPress('left', false));
  rBtn.addEventListener('touchstart', onPress('right', true));
  rBtn.addEventListener('touchend',   onPress('right', false));
  rBtn.addEventListener('mousedown',  onPress('right', true));
  rBtn.addEventListener('mouseup',    onPress('right', false));
  rBtn.addEventListener('mouseleave', onPress('right', false));

  document.getElementById('brkExit').onclick = () => {
    stopGame();
    buildChapterGrid(); showPage('pageSelect');
  };

  function resetBall() {
    game.ball.x = game.paddle.x + game.paddle.w/2;
    game.ball.y = game.paddle.y - 10;
    game.ball.dx = 3 * (Math.random() < 0.5 ? -1 : 1);
    game.ball.dy = -3;
  }

  function update() {
    if (game.over || game.won) return;
    // 패들
    if (game.moving.left)  game.paddle.x = Math.max(0, game.paddle.x - 6);
    if (game.moving.right) game.paddle.x = Math.min(W - game.paddle.w, game.paddle.x + 6);
    // 볼
    game.ball.x += game.ball.dx;
    game.ball.y += game.ball.dy;
    // 벽 충돌
    if (game.ball.x - game.ball.r < 0) { game.ball.x = game.ball.r; game.ball.dx *= -1; }
    if (game.ball.x + game.ball.r > W) { game.ball.x = W - game.ball.r; game.ball.dx *= -1; }
    if (game.ball.y - game.ball.r < 0) { game.ball.y = game.ball.r; game.ball.dy *= -1; }
    // 패들 충돌
    if (game.ball.y + game.ball.r >= game.paddle.y &&
        game.ball.y + game.ball.r <= game.paddle.y + game.paddle.h + 5 &&
        game.ball.x >= game.paddle.x &&
        game.ball.x <= game.paddle.x + game.paddle.w &&
        game.ball.dy > 0) {
      game.ball.dy *= -1;
      // 위치별 각도 변화
      const hitPos = (game.ball.x - game.paddle.x) / game.paddle.w; // 0..1
      game.ball.dx = (hitPos - 0.5) * 8;
    }
    // 바닥 (생명 -1)
    if (game.ball.y - game.ball.r > H) {
      game.lives--;
      if (game.lives <= 0) {
        game.over = true;
      } else {
        resetBall();
      }
    }
    // 벽돌 충돌
    game.bricks.forEach(br => {
      if (!br.alive) return;
      if (game.ball.x + game.ball.r > br.x &&
          game.ball.x - game.ball.r < br.x + br.w &&
          game.ball.y + game.ball.r > br.y &&
          game.ball.y - game.ball.r < br.y + br.h) {
        br.alive = false;
        game.score += 10;
        // 충돌 방향 (간단히 y 반사)
        game.ball.dy *= -1;
      }
    });
    // 다음 레벨
    if (game.bricks.every(b => !b.alive)) {
      game.level++;
      if (game.level > 5) {
        game.won = true;
      } else {
        game.bricks = buildBricks(game.level);
        resetBall();
        const speedUp = 1.1;
        game.ball.dx *= speedUp;
        game.ball.dy *= speedUp;
      }
    }
  }

  function draw() {
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, W, H);
    // 벽돌
    game.bricks.forEach(br => {
      if (!br.alive) return;
      ctx.fillStyle = br.color;
      ctx.fillRect(br.x, br.y, br.w, br.h);
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.fillRect(br.x, br.y, br.w, 4);
    });
    // 패들
    ctx.fillStyle = '#6ba8c4';
    ctx.fillRect(game.paddle.x, game.paddle.y, game.paddle.w, game.paddle.h);
    // 볼
    ctx.fillStyle = '#ffc850';
    ctx.beginPath();
    ctx.arc(game.ball.x, game.ball.y, game.ball.r, 0, Math.PI*2);
    ctx.fill();
    // HUD
    document.getElementById('brkScore').textContent = game.score;
    document.getElementById('brkLives').textContent = game.lives;
    document.getElementById('brkLevel').textContent = game.level;
    // 종료
    if (game.over || game.won) {
      const wrap = canvas.parentElement;
      let ov = wrap.querySelector('.game-overlay');
      if (!ov) {
        ov = document.createElement('div');
        ov.className = 'game-overlay';
        const isBest = recordGameBest('breaker', game.score);
        const title = game.won ? '🏆 ALL CLEAR!' : '💥 GAME OVER';
        ov.innerHTML = '<div class="game-overlay-title">' + title + '</div>' +
          '<div class="game-overlay-score">スコア ' + game.score + (isBest ? ' 🏆 NEW!' : '') + '</div>' +
          '<button class="game-overlay-btn" id="brkRetry">もう一度</button>' +
          '<button class="game-overlay-btn" id="brkMenu" style="background:#7a4a8a;margin-top:8px;">メニュー</button>';
        wrap.appendChild(ov);
        document.getElementById('brkRetry').onclick = () => tryRetryGame(startBreakerGame);
        document.getElementById('brkMenu').onclick = () => { stopGame(); buildChapterGrid(); showPage('pageSelect'); };
      }
    }
  }

  function loop() {
    update();
    draw();
    if (!game.over && !game.won) game.raf = requestAnimationFrame(loop);
  }
  loop();

  game.cleanup = () => {
    if (game.raf) cancelAnimationFrame(game.raf);
    document.removeEventListener('keydown', game.keyDown);
    document.removeEventListener('keyup', game.keyUp);
  };
}

// ============================================================
// 🔢 2048
// ============================================================
function start2048Game() {
  const area = document.getElementById('gameArea');
  let html = '<div class="game-header"><div class="game-title">🔢 2048</div></div>';
  html += '<div class="game-instruction">⬅️➡️⬆️⬇️ で タイルを 動かす / 同じ数字を 合体!</div>';
  html += '<div class="game-hud">';
  html += '<div class="game-hud-item">⭐ <span id="g2048Score">0</span></div>';
  html += '<div class="game-hud-item">🏆 <span id="g2048Best">0</span></div>';
  html += '<button class="game-back-link" id="g2048Exit">やめる</button>';
  html += '</div>';
  html += '<div class="game-canvas-wrap" style="width:340px;">';
  html += '<canvas id="g2048Canvas" width="340" height="340" style="display:block;background:#bbada0;"></canvas>';
  html += '</div>';
  html += '<div class="game-touch-controls" style="max-width:340px;margin-left:auto;margin-right:auto;">';
  html += '<button class="game-touch-btn" id="g2048Up" style="grid-column:2;">▲</button>';
  html += '</div>';
  html += '<div class="game-touch-controls" style="max-width:340px;margin-left:auto;margin-right:auto;">';
  html += '<button class="game-touch-btn" id="g2048Left">◀</button>';
  html += '<button class="game-touch-btn" id="g2048Down">▼</button>';
  html += '<button class="game-touch-btn" id="g2048Right">▶</button>';
  html += '</div>';
  html += '<div class="game-action-row"><button class="game-btn danger" id="g2048Restart">リスタート</button></div>';
  area.innerHTML = html;

  const canvas = document.getElementById('g2048Canvas');
  const ctx = canvas.getContext('2d');
  const SIZE = 4;
  const TILE = 80;
  const PAD = 4;
  const game = {
    grid: Array.from({length: SIZE}, () => Array(SIZE).fill(0)),
    score: 0,
    over: false, won: false,
    raf: null,
  };
  CurrentGame = game;

  const bestScore = (State.gameStats && State.gameStats['2048'] && State.gameStats['2048'].best) || 0;
  document.getElementById('g2048Best').textContent = bestScore;

  function addRandomTile() {
    const empty = [];
    for (let r = 0; r < SIZE; r++) for (let c = 0; c < SIZE; c++) {
      if (game.grid[r][c] === 0) empty.push([r, c]);
    }
    if (empty.length === 0) return false;
    const [r, c] = empty[Math.floor(Math.random() * empty.length)];
    game.grid[r][c] = Math.random() < 0.9 ? 2 : 4;
    return true;
  }
  addRandomTile();
  addRandomTile();

  function slide(row) {
    // 0이 아닌 것만 모음
    const arr = row.filter(v => v !== 0);
    // 합치기
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] === arr[i+1]) {
        arr[i] *= 2;
        game.score += arr[i];
        if (arr[i] === 2048) game.won = true;
        arr.splice(i+1, 1);
      }
    }
    while (arr.length < SIZE) arr.push(0);
    return arr;
  }

  function move(dir) {
    if (game.over) return false;
    const before = JSON.stringify(game.grid);
    if (dir === 'left') {
      for (let r = 0; r < SIZE; r++) game.grid[r] = slide(game.grid[r]);
    } else if (dir === 'right') {
      for (let r = 0; r < SIZE; r++) game.grid[r] = slide(game.grid[r].reverse()).reverse();
    } else if (dir === 'up') {
      for (let c = 0; c < SIZE; c++) {
        let col = [];
        for (let r = 0; r < SIZE; r++) col.push(game.grid[r][c]);
        col = slide(col);
        for (let r = 0; r < SIZE; r++) game.grid[r][c] = col[r];
      }
    } else if (dir === 'down') {
      for (let c = 0; c < SIZE; c++) {
        let col = [];
        for (let r = 0; r < SIZE; r++) col.push(game.grid[r][c]);
        col = slide(col.reverse()).reverse();
        for (let r = 0; r < SIZE; r++) game.grid[r][c] = col[r];
      }
    }
    const after = JSON.stringify(game.grid);
    if (before !== after) {
      addRandomTile();
      sfx('click');
      // 게임 오버 체크
      if (!hasMove()) game.over = true;
      return true;
    }
    return false;
  }

  function hasMove() {
    for (let r = 0; r < SIZE; r++) for (let c = 0; c < SIZE; c++) {
      if (game.grid[r][c] === 0) return true;
      if (c < SIZE - 1 && game.grid[r][c] === game.grid[r][c+1]) return true;
      if (r < SIZE - 1 && game.grid[r][c] === game.grid[r+1][c]) return true;
    }
    return false;
  }

  game.keyHandler = (e) => {
    if (game.over) return;
    if (e.key === 'ArrowLeft')  { move('left');  e.preventDefault(); }
    else if (e.key === 'ArrowRight') { move('right'); e.preventDefault(); }
    else if (e.key === 'ArrowUp')    { move('up');    e.preventDefault(); }
    else if (e.key === 'ArrowDown')  { move('down');  e.preventDefault(); }
  };
  document.addEventListener('keydown', game.keyHandler);
  document.getElementById('g2048Left').onclick  = () => move('left');
  document.getElementById('g2048Right').onclick = () => move('right');
  document.getElementById('g2048Up').onclick    = () => move('up');
  document.getElementById('g2048Down').onclick  = () => move('down');
  document.getElementById('g2048Restart').onclick = () => tryRetryGame(start2048Game);
  document.getElementById('g2048Exit').onclick = () => {
    stopGame();
    buildChapterGrid(); showPage('pageSelect');
  };

  // 캔버스 스와이프
  let touchStart = null;
  canvas.addEventListener('touchstart', (e) => {
    touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  });
  canvas.addEventListener('touchend', (e) => {
    if (!touchStart) return;
    const dx = e.changedTouches[0].clientX - touchStart.x;
    const dy = e.changedTouches[0].clientY - touchStart.y;
    if (Math.abs(dx) < 30 && Math.abs(dy) < 30) return;
    if (Math.abs(dx) > Math.abs(dy)) move(dx > 0 ? 'right' : 'left');
    else move(dy > 0 ? 'down' : 'up');
    touchStart = null;
  });

  function tileColor(v) {
    const map = {
      0: '#cdc1b4', 2: '#eee4da', 4: '#ede0c8', 8: '#f2b179',
      16: '#f59563', 32: '#f67c5f', 64: '#f65e3b', 128: '#edcf72',
      256: '#edcc61', 512: '#edc850', 1024: '#edc53f', 2048: '#edc22e',
    };
    return map[v] || '#3c3a32';
  }
  function tileText(v) { return v >= 100 ? '#f9f6f2' : (v >= 8 ? '#f9f6f2' : '#776e65'); }

  function draw() {
    ctx.fillStyle = '#bbada0';
    ctx.fillRect(0, 0, 340, 340);
    for (let r = 0; r < SIZE; r++) for (let c = 0; c < SIZE; c++) {
      const x = PAD + c * (TILE + PAD);
      const y = PAD + r * (TILE + PAD);
      const v = game.grid[r][c];
      ctx.fillStyle = tileColor(v);
      ctx.fillRect(x, y, TILE, TILE);
      if (v > 0) {
        ctx.fillStyle = tileText(v);
        ctx.font = (v >= 1000 ? '22' : v >= 100 ? '26' : '32') + "px 'RocknRoll One', sans-serif";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(v, x + TILE/2, y + TILE/2);
      }
    }
    document.getElementById('g2048Score').textContent = game.score;
    if (game.over || game.won) {
      const wrap = canvas.parentElement;
      let ov = wrap.querySelector('.game-overlay');
      if (!ov) {
        ov = document.createElement('div');
        ov.className = 'game-overlay';
        const isBest = recordGameBest('2048', game.score);
        const title = game.won ? '🏆 2048 ACHIEVED!' : '💥 GAME OVER';
        ov.innerHTML = '<div class="game-overlay-title">' + title + '</div>' +
          '<div class="game-overlay-score">スコア ' + game.score + (isBest ? ' 🏆 NEW!' : '') + '</div>' +
          '<button class="game-overlay-btn" id="g2048Retry">もう一度</button>' +
          '<button class="game-overlay-btn" id="g2048Mn" style="background:#7a4a8a;margin-top:8px;">メニュー</button>';
        wrap.appendChild(ov);
        document.getElementById('g2048Retry').onclick = () => tryRetryGame(start2048Game);
        document.getElementById('g2048Mn').onclick = () => { stopGame(); buildChapterGrid(); showPage('pageSelect'); };
      }
    }
  }

  function loop() {
    draw();
    game.raf = requestAnimationFrame(loop);
  }
  loop();

  game.cleanup = () => {
    if (game.raf) cancelAnimationFrame(game.raf);
    document.removeEventListener('keydown', game.keyHandler);
  };
}

// ============================================================
// 🌀 미로 탈출
// ============================================================
function startMazeGame() {
  const area = document.getElementById('gameArea');
  let html = '<div class="game-header"><div class="game-title">🌀 迷路</div></div>';
  html += '<div class="game-instruction">⬅️➡️⬆️⬇️ で 進む / ⭐ から 🏁 まで 行こう!</div>';
  html += '<div class="game-hud">';
  html += '<div class="game-hud-item">⏱ <span id="mzTime">0</span> 秒</div>';
  html += '<div class="game-hud-item">🚶 <span id="mzSteps">0</span> 歩</div>';
  html += '<div class="game-hud-item">🎯 LV<span id="mzLevel">1</span></div>';
  html += '<button class="game-back-link" id="mzExit">やめる</button>';
  html += '</div>';
  html += '<div class="game-canvas-wrap" style="width:360px;">';
  html += '<canvas id="mzCanvas" width="360" height="360" style="display:block;background:#fff;"></canvas>';
  html += '</div>';
  html += '<div class="game-touch-controls" style="max-width:360px;margin-left:auto;margin-right:auto;">';
  html += '<button class="game-touch-btn" id="mzUp" style="grid-column:2;">▲</button>';
  html += '</div>';
  html += '<div class="game-touch-controls" style="max-width:360px;margin-left:auto;margin-right:auto;">';
  html += '<button class="game-touch-btn" id="mzLeft">◀</button>';
  html += '<button class="game-touch-btn" id="mzDown">▼</button>';
  html += '<button class="game-touch-btn" id="mzRight">▶</button>';
  html += '</div>';
  area.innerHTML = html;

  const canvas = document.getElementById('mzCanvas');
  const ctx = canvas.getContext('2d');
  const game = {
    level: 1,
    size: 11, // 미로 한 변 셀 수 (홀수)
    cellPx: 0,
    maze: null,
    px: 1, py: 1,
    gx: 0, gy: 0,
    steps: 0,
    startTime: Date.now(),
    won: false,
    raf: null,
  };
  CurrentGame = game;

  function buildMaze(size) {
    // DFS 미로 생성. size는 홀수.
    const maze = Array.from({length: size}, () => Array(size).fill(1));
    function dig(x, y) {
      maze[y][x] = 0;
      const dirs = [[2,0],[-2,0],[0,2],[0,-2]];
      for (let i = dirs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [dirs[i], dirs[j]] = [dirs[j], dirs[i]];
      }
      dirs.forEach(([dx, dy]) => {
        const nx = x + dx, ny = y + dy;
        if (nx > 0 && nx < size - 1 && ny > 0 && ny < size - 1 && maze[ny][nx] === 1) {
          maze[y + dy/2][x + dx/2] = 0;
          dig(nx, ny);
        }
      });
    }
    dig(1, 1);
    return maze;
  }

  function newLevel() {
    // 레벨에 따라 미로 크기
    game.size = Math.min(11 + (game.level - 1) * 2, 21);
    if (game.size % 2 === 0) game.size++;
    game.maze = buildMaze(game.size);
    game.cellPx = Math.floor(360 / game.size);
    game.px = 1; game.py = 1;
    game.gx = game.size - 2; game.gy = game.size - 2;
    game.maze[game.gy][game.gx] = 0;
    game.steps = 0;
    game.startTime = Date.now();
    game.won = false;
    const ov = canvas.parentElement.querySelector('.game-overlay');
    if (ov) ov.remove();
  }
  newLevel();

  function move(dx, dy) {
    if (game.won) return;
    const nx = game.px + dx, ny = game.py + dy;
    if (nx < 0 || nx >= game.size || ny < 0 || ny >= game.size) return;
    if (game.maze[ny][nx] === 1) return;
    game.px = nx; game.py = ny;
    game.steps++;
    if (game.px === game.gx && game.py === game.gy) {
      game.won = true;
      sfx('chime');
    } else {
      sfx('click');
    }
  }

  game.keyHandler = (e) => {
    if (e.key === 'ArrowLeft')  { move(-1, 0); e.preventDefault(); }
    else if (e.key === 'ArrowRight') { move(1, 0);  e.preventDefault(); }
    else if (e.key === 'ArrowUp')    { move(0, -1); e.preventDefault(); }
    else if (e.key === 'ArrowDown')  { move(0, 1);  e.preventDefault(); }
  };
  document.addEventListener('keydown', game.keyHandler);
  document.getElementById('mzLeft').onclick  = () => move(-1, 0);
  document.getElementById('mzRight').onclick = () => move(1, 0);
  document.getElementById('mzUp').onclick    = () => move(0, -1);
  document.getElementById('mzDown').onclick  = () => move(0, 1);
  document.getElementById('mzExit').onclick = () => {
    stopGame();
    buildChapterGrid(); showPage('pageSelect');
  };

  function draw() {
    const cs = game.cellPx;
    // 배경
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, 360, 360);
    // 벽
    for (let y = 0; y < game.size; y++) for (let x = 0; x < game.size; x++) {
      if (game.maze[y][x] === 1) {
        ctx.fillStyle = '#2a5a2a';
        ctx.fillRect(x * cs, y * cs, cs, cs);
      }
    }
    // 골
    ctx.fillStyle = '#ffc850';
    ctx.fillRect(game.gx * cs + 3, game.gy * cs + 3, cs - 6, cs - 6);
    ctx.fillStyle = '#2a5a2a';
    ctx.font = (cs - 6) + "px sans-serif";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🏁', game.gx * cs + cs/2, game.gy * cs + cs/2);
    // 플레이어
    ctx.fillStyle = '#3a7ac8';
    ctx.beginPath();
    ctx.arc(game.px * cs + cs/2, game.py * cs + cs/2, cs/2 - 3, 0, Math.PI*2);
    ctx.fill();
    // HUD
    const elapsed = Math.floor((Date.now() - game.startTime) / 1000);
    document.getElementById('mzTime').textContent = elapsed;
    document.getElementById('mzSteps').textContent = game.steps;
    document.getElementById('mzLevel').textContent = game.level;
    // 클리어 화면
    if (game.won) {
      const wrap = canvas.parentElement;
      let ov = wrap.querySelector('.game-overlay');
      if (!ov) {
        ov = document.createElement('div');
        ov.className = 'game-overlay';
        // 점수: 레벨×100 - 시간 - 걸음수
        const score = Math.max(0, game.level * 100 - elapsed - game.steps);
        const isBest = recordGameBest('maze', score);
        ov.innerHTML = '<div class="game-overlay-title">🏆 CLEAR!</div>' +
          '<div class="game-overlay-score">⏱ ' + elapsed + '秒 / 🚶 ' + game.steps + '歩 / スコア ' + score + (isBest ? ' 🏆 NEW!' : '') + '</div>' +
          '<button class="game-overlay-btn" id="mzNext">次の レベル →</button>' +
          '<button class="game-overlay-btn" id="mzMn" style="background:#7a4a8a;margin-top:8px;">メニュー</button>';
        wrap.appendChild(ov);
        document.getElementById('mzNext').onclick = () => {
          game.level++;
          newLevel();
        };
        document.getElementById('mzMn').onclick = () => { stopGame(); buildChapterGrid(); showPage('pageSelect'); };
      }
    }
  }

  function loop() {
    draw();
    game.raf = requestAnimationFrame(loop);
  }
  loop();

  game.cleanup = () => {
    if (game.raf) cancelAnimationFrame(game.raf);
    document.removeEventListener('keydown', game.keyHandler);
  };
}
