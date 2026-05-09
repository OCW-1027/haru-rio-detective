// engine/chat-ui.js — Chat modal UI (Bundle B: presence·typing·read·in-app notify)
import {
  ChatState, setRole, setNames, generatePairingCode, pairWithCode,
  sendMessage, markAllAsRead, resetPairing,
  setPresenceModalOpen, setPresenceChatView,
  notifyTyping, notifyTypingStop, setMuted,
  setPushEnabled, getFirebaseApp, getFirebaseDb
} from './chat-core.js';
import { enablePush, disablePush } from './chat-fcm.js';

let modalEl = null;
let currentView = null;
let emojiPanelOpen = false;
let currentEmojiTab = '表情';
let _audioCtx = null;

// Quick row (12, frequently used)
const EMOJI_QUICK = ['😀','😂','😍','🥰','😊','😢','😭','❤️','👍','🎉','🌟','✨'];

// Category tabs (4)
const EMOJI_CATS = {
  '表情': [
    '😀','😃','😄','😁','😆','😂','🤣','😊','😇','🙂','🙃','😉',
    '🥲','🥰','😍','🤩','😘','😗','😚','😙','🤗','🤔','🤨','😐',
    '🙄','😏','😴','🤤','😪','😫','🥱','😌','😛','😜','🤪','😎',
    '🤓','🥺','😢','😭','😤','😠','😡','🤯','😱','😨','😰'
  ],
  '動物': [
    '🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮',
    '🐷','🐽','🐸','🐵','🙈','🙉','🙊','🐔','🐧','🐦','🐤','🦄',
    '🐝','🐛','🦋','🐌','🐞','🐢','🐬','🐳','🌸','🌺','🌻','🌷',
    '🌹','🌼','🌳','🌲','🍀','🌟','⭐','☀️','⛅','☁️','🌙','⚡'
  ],
  '食べ物': [
    '🍎','🍌','🍓','🍇','🍉','🍊','🍒','🍑','🥝','🍍','🥭','🥑',
    '🍕','🍔','🍟','🌭','🌮','🍿','🍰','🧁','🍪','🍩','🍫','🍬',
    '🍭','🍮','🍦','🍡','🍙','🍚','🍜','🍣','🍤','🍱','🍛','🍝',
    '☕','🍵','🥛','🧃','🥤'
  ],
  'ハート': [
    '❤️','🧡','💛','💚','💙','💜','🖤','🤍','💔','❤️‍🔥','💕','💖',
    '💗','💘','💝','💞','💟','✨','🌟','⭐','🎉','🎊','🎈','🎁',
    '🎀','💯','🔥','⚡','👍','👎','🙏','👋','✌️','👌','🤝','🤲'
  ]
};

function escapeHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function formatTime(ts) {
  if (!ts) return '';
  const d = ts.toDate ? ts.toDate() : (ts instanceof Date ? ts : new Date(ts));
  const h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0');
  return `${h}:${m}`;
}

// ===== Presence helper text =====
function formatPresence(p) {
  if (!p) return '';
  if (p.online) return '🟢 オンライン';
  if (!p.lastSeen) return '';  // never seen
  const ms = p.lastSeen.toMillis ? p.lastSeen.toMillis() : new Date(p.lastSeen).getTime();
  const diff = Date.now() - ms;
  if (diff < 60 * 1000) return '⚪ さっきまで オンライン';
  if (diff < 60 * 60 * 1000) return '⚪ ' + Math.floor(diff / 60000) + '分前';
  if (diff < 24 * 60 * 60 * 1000) return '⚪ ' + Math.floor(diff / (60 * 60 * 1000)) + '時間前';
  const d = new Date(ms);
  return '⚪ ' + d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function ensureModal() {
  if (modalEl) return modalEl;
  modalEl = document.createElement('div');
  modalEl.className = 'chat-modal chat-hidden';
  modalEl.innerHTML = `
    <div class="chat-modal-content">
      <div class="chat-topbar">
        <button class="chat-back" id="chatBack">← 閉じる</button>
        <div class="chat-title-wrap">
          <div class="chat-title" id="chatTitle">チャット</div>
          <div class="chat-presence-line chat-hidden" id="chatPresence"></div>
        </div>
        <button class="chat-settings chat-hidden" id="chatSettings">⚙</button>
      </div>
      <div class="chat-body" id="chatBody"></div>
      <div class="chat-emoji-panel chat-hidden" id="chatEmojiPanel"></div>
      <div class="chat-typing-bar chat-hidden" id="chatTypingBar">
        <span id="chatTypingText"></span><span class="chat-typing-dots"><span>·</span><span>·</span><span>·</span></span>
      </div>
      <div class="chat-input-bar chat-hidden" id="chatInputBar">
        <button class="chat-emoji-btn" id="chatEmojiBtn" type="button" aria-label="絵文字">😀</button>
        <textarea class="chat-input" id="chatInput" rows="1" placeholder="メッセージを入力…"></textarea>
        <button class="chat-send" id="chatSend">送信</button>
      </div>
    </div>
  `;
  document.body.appendChild(modalEl);

  document.getElementById('chatBack').onclick = closeChatModal;
  document.getElementById('chatSettings').onclick = () => switchView('settings');
  document.getElementById('chatSend').onclick = handleSend;
  document.getElementById('chatEmojiBtn').onclick = toggleEmojiPanel;

  const inputEl = document.getElementById('chatInput');
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  });
  inputEl.addEventListener('input', () => {
    inputEl.style.height = 'auto';
    inputEl.style.height = Math.min(inputEl.scrollHeight, 120) + 'px';
    // Bundle B: typing notification (debounced inside core)
    if (inputEl.value.trim().length > 0) {
      notifyTyping();
    } else {
      notifyTypingStop();
    }
  });
  inputEl.addEventListener('focus', () => {
    if (emojiPanelOpen) closeEmojiPanel();
  });
  return modalEl;
}

// ===== Emoji panel =====

function toggleEmojiPanel() {
  if (emojiPanelOpen) closeEmojiPanel();
  else openEmojiPanel();
}

function openEmojiPanel() {
  emojiPanelOpen = true;
  const panel = document.getElementById('chatEmojiPanel');
  if (!panel) return;
  panel.classList.remove('chat-hidden');
  renderEmojiPanel();
}

function closeEmojiPanel() {
  emojiPanelOpen = false;
  const panel = document.getElementById('chatEmojiPanel');
  if (!panel) return;
  panel.classList.add('chat-hidden');
}

function renderEmojiPanel() {
  const panel = document.getElementById('chatEmojiPanel');
  if (!panel) return;
  const tabs = Object.keys(EMOJI_CATS);
  const grid = EMOJI_CATS[currentEmojiTab] || [];
  panel.innerHTML = `
    <div class="chat-emoji-quick">
      ${EMOJI_QUICK.map(e => `<button class="chat-emoji-item" type="button" data-emoji="${e}">${e}</button>`).join('')}
    </div>
    <div class="chat-emoji-tabs">
      ${tabs.map(t =>
        `<button class="chat-emoji-tab ${t === currentEmojiTab ? 'chat-emoji-tab-active' : ''}" type="button" data-tab="${escapeHtml(t)}">${escapeHtml(t)}</button>`
      ).join('')}
    </div>
    <div class="chat-emoji-grid" id="chatEmojiGrid">
      ${grid.map(e => `<button class="chat-emoji-item" type="button" data-emoji="${e}">${e}</button>`).join('')}
    </div>
  `;
  panel.querySelectorAll('.chat-emoji-item').forEach(b => {
    b.onclick = (ev) => {
      ev.preventDefault();
      insertEmoji(b.dataset.emoji);
    };
  });
  panel.querySelectorAll('.chat-emoji-tab').forEach(t => {
    t.onclick = (ev) => {
      ev.preventDefault();
      currentEmojiTab = t.dataset.tab;
      renderEmojiPanel();
    };
  });
}

function insertEmoji(emoji) {
  const input = document.getElementById('chatInput');
  if (!input || !emoji) return;
  const start = input.selectionStart;
  const end = input.selectionEnd;
  if (typeof start === 'number' && typeof end === 'number' && document.activeElement === input) {
    const v = input.value;
    input.value = v.slice(0, start) + emoji + v.slice(end);
    const newPos = start + emoji.length;
    try { input.setSelectionRange(newPos, newPos); } catch (e) {}
  } else {
    input.value += emoji;
  }
  input.dispatchEvent(new Event('input'));
}

async function handleSend() {
  const input = document.getElementById('chatInput');
  if (!input) return;
  const text = input.value;
  if (!text.trim()) return;
  input.value = '';
  input.style.height = 'auto';
  try {
    await sendMessage(text);
  } catch (e) {
    console.error('[chat] send', e);
    alert('送信失敗: ' + (e.message || e));
  }
}

export function openChatModal() {
  ensureModal();
  modalEl.classList.remove('chat-hidden');
  setPresenceModalOpen(true);
  if (!ChatState.isReady) {
    switchView('loading');
    return;
  }
  if (!ChatState.role) {
    switchView('role-select');
  } else if (!ChatState.pairId) {
    switchView(ChatState.role === 'parent' ? 'pairing-parent' : 'pairing-child');
  } else {
    switchView('chat');
    markAllAsRead().catch(() => {});
  }
}

export function closeChatModal() {
  if (modalEl) modalEl.classList.add('chat-hidden');
  closeEmojiPanel();
  setPresenceChatView(false);
  setPresenceModalOpen(false);
}

function switchView(view) {
  ensureModal();
  const wasInChat = currentView === 'chat';
  currentView = view;
  const body = document.getElementById('chatBody');
  const inputBar = document.getElementById('chatInputBar');
  const settingsBtn = document.getElementById('chatSettings');
  const titleEl = document.getElementById('chatTitle');
  const presenceEl = document.getElementById('chatPresence');
  const typingBar = document.getElementById('chatTypingBar');

  inputBar.classList.add('chat-hidden');
  settingsBtn.classList.add('chat-hidden');
  if (presenceEl) presenceEl.classList.add('chat-hidden');
  if (typingBar) typingBar.classList.add('chat-hidden');
  closeEmojiPanel();

  if (wasInChat && view !== 'chat') setPresenceChatView(false);

  if (view === 'loading') {
    titleEl.textContent = 'チャット';
    body.innerHTML = `<div class="chat-role-select"><h2>読み込み中…</h2><p>Firebase に接続中です。少々お待ちください。</p></div>`;
    return;
  }

  if (view === 'role-select') {
    titleEl.textContent = '役割選択';
    body.innerHTML = `
      <div class="chat-role-select">
        <h2>チャットを始める</h2>
        <p>あなたはどちらですか？</p>
        <button class="chat-role-btn" data-role="parent">私は親(パパ)</button>
        <button class="chat-role-btn" data-role="child">私は子(ハル)</button>
      </div>
    `;
    body.querySelectorAll('.chat-role-btn').forEach(b => {
      b.onclick = () => {
        const role = b.dataset.role;
        setRole(role);
        switchView(role === 'parent' ? 'pairing-parent' : 'pairing-child');
      };
    });
    return;
  }

  if (view === 'pairing-parent') {
    titleEl.textContent = 'ペアリング (親)';
    settingsBtn.classList.remove('chat-hidden');
    body.innerHTML = `
      <div class="chat-pair-parent">
        <h2>子の機器と接続</h2>
        <button id="chatGenCode" class="chat-action-btn">ペアリングコードを作る</button>
        <div id="chatCodeDisplay" class="chat-code-display chat-hidden"></div>
        <div class="chat-help" id="chatPairHelp"></div>
      </div>
    `;
    document.getElementById('chatGenCode').onclick = async () => {
      const btn = document.getElementById('chatGenCode');
      btn.disabled = true;
      try {
        const code = await generatePairingCode();
        const disp = document.getElementById('chatCodeDisplay');
        disp.textContent = code;
        disp.classList.remove('chat-hidden');
        document.getElementById('chatPairHelp').textContent =
          '5分以内に子の機器で入力してください。子のペアリングを待っています…';
        btn.classList.add('chat-hidden');
      } catch (e) {
        btn.disabled = false;
        alert('コードの作成に失敗しました: ' + (e.message || e));
      }
    };
    return;
  }

  if (view === 'pairing-child') {
    titleEl.textContent = 'ペアリング (子)';
    settingsBtn.classList.remove('chat-hidden');
    body.innerHTML = `
      <div class="chat-pair-child">
        <h2>ペアリングコードを入力</h2>
        <input type="text" id="chatPairCode" inputmode="numeric" maxlength="6" placeholder="000000" autocomplete="off">
        <button id="chatPairConfirm" class="chat-action-btn">確認</button>
        <div class="chat-help">親の画面に表示された6桁の数字を入力してください。</div>
        <div class="chat-error chat-hidden" id="chatPairError"></div>
      </div>
    `;
    const codeInput = document.getElementById('chatPairCode');
    codeInput.focus();
    const confirmBtn = document.getElementById('chatPairConfirm');
    const submit = async () => {
      const errEl = document.getElementById('chatPairError');
      errEl.classList.add('chat-hidden');
      const code = codeInput.value.trim();
      if (!/^\d{6}$/.test(code)) {
        errEl.textContent = '6桁のコードを入力してください';
        errEl.classList.remove('chat-hidden');
        return;
      }
      confirmBtn.disabled = true;
      try {
        await pairWithCode(code);
      } catch (e) {
        confirmBtn.disabled = false;
        errEl.textContent = e.message || 'ペアリングに失敗しました';
        errEl.classList.remove('chat-hidden');
      }
    };
    confirmBtn.onclick = submit;
    codeInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); submit(); }
    });
    return;
  }

  if (view === 'chat') {
    const otherName = ChatState.role === 'parent' ? ChatState.childName : ChatState.parentName;
    titleEl.textContent = otherName || 'チャット';
    inputBar.classList.remove('chat-hidden');
    settingsBtn.classList.remove('chat-hidden');
    if (presenceEl) {
      const txt = formatPresence(ChatState.otherPresence);
      if (txt) {
        presenceEl.textContent = txt;
        presenceEl.classList.remove('chat-hidden');
        presenceEl.classList.toggle('chat-presence-online', !!ChatState.otherPresence?.online);
      }
    }
    setPresenceChatView(true);
    body.innerHTML = `<div class="chat-messages" id="chatMessages"></div>`;
    renderMessages();
    updateTypingBar();
    return;
  }

  if (view === 'settings') {
    titleEl.textContent = '設定';
    body.innerHTML = `
      <div class="chat-settings-view">
        <label>親の呼び方
          <input type="text" id="chatParentName" maxlength="12" value="${escapeHtml(ChatState.parentName)}">
        </label>
        <label>子の呼び方
          <input type="text" id="chatChildName" maxlength="12" value="${escapeHtml(ChatState.childName)}">
        </label>
        <button id="chatSaveNames" class="chat-action-btn">呼び方を保存</button>
        <hr>
        <label class="chat-mute-toggle">
          <input type="checkbox" id="chatMuteToggle" ${ChatState.muted ? '' : 'checked'}>
          <span>🔔 通知音</span>
        </label>
        <label class="chat-mute-toggle">
          <input type="checkbox" id="chatPushToggle" ${ChatState.pushEnabled ? 'checked' : ''}>
          <span>📲 プッシュ通知 (チャット閉じても受信)</span>
        </label>
        <div class="chat-push-status chat-hidden" id="chatPushStatus"></div>
        <hr>
        <button id="chatBackToChat" class="chat-action-btn">← 戻る</button>
        <button id="chatResetPair" class="chat-danger-btn">ペアリングをリセット</button>
      </div>
    `;
    document.getElementById('chatSaveNames').onclick = async () => {
      const pn = (document.getElementById('chatParentName').value || '').trim() || 'パパ';
      const cn = (document.getElementById('chatChildName').value || '').trim() || 'ハル';
      try {
        await setNames({ parentName: pn, childName: cn });
        alert('保存しました');
      } catch (e) {
        alert('保存に失敗しました: ' + (e.message || e));
      }
    };
    document.getElementById('chatMuteToggle').onchange = (e) => {
      // Checkbox checked = sound ON = muted false
      setMuted(!e.target.checked);
    };
    const pushToggle = document.getElementById('chatPushToggle');
    const pushStatus = document.getElementById('chatPushStatus');
    const setPushStatusText = (txt) => {
      if (!pushStatus) return;
      if (txt) {
        pushStatus.textContent = txt;
        pushStatus.classList.remove('chat-hidden');
      } else {
        pushStatus.classList.add('chat-hidden');
      }
    };
    if (typeof Notification === 'undefined') {
      pushToggle.disabled = true;
      setPushStatusText('このブラウザはプッシュ通知に未対応です');
    }
    pushToggle.onchange = async (e) => {
      const wantOn = e.target.checked;
      pushToggle.disabled = true;
      if (wantOn) {
        if (!ChatState.pairId) {
          setPushStatusText('ペアリング後に有効化できます');
          pushToggle.checked = false;
          pushToggle.disabled = false;
          return;
        }
        setPushStatusText('登録中…');
        const r = await enablePush(getFirebaseApp(), getFirebaseDb(), ChatState);
        pushToggle.disabled = false;
        if (r && r.ok) {
          setPushEnabled(true);
          pushToggle.checked = true;
          setPushStatusText('✓ 有効');
        } else {
          pushToggle.checked = false;
          const reason = r && r.reason || 'error';
          if (reason === 'permission-denied') {
            setPushStatusText('通知が拒否されています。ブラウザ設定で許可してください');
          } else if (reason === 'unsupported') {
            setPushStatusText('このブラウザはプッシュ通知に未対応です');
          } else {
            setPushStatusText('登録に失敗しました');
          }
        }
      } else {
        await disablePush();
        setPushEnabled(false);
        pushToggle.disabled = false;
        setPushStatusText('無効化しました');
      }
    };
    document.getElementById('chatBackToChat').onclick = () => {
      if (ChatState.pairId) switchView('chat');
      else if (ChatState.role) switchView(ChatState.role === 'parent' ? 'pairing-parent' : 'pairing-child');
      else switchView('role-select');
    };
    document.getElementById('chatResetPair').onclick = () => {
      if (!confirm('本当にペアリングをリセットしますか？メッセージは相手の機器には残ります。')) return;
      resetPairing();
      try { localStorage.removeItem('haruchat_role'); } catch (e) {}
      ChatState.role = null;
      switchView('role-select');
    };
    return;
  }
}

function renderMessages() {
  const wrap = document.getElementById('chatMessages');
  if (!wrap) return;
  let html = '';
  let lastTimeKey = null;
  for (const msg of ChatState.messages) {
    const mine = msg.senderRole === ChatState.role;
    const t = msg.createdAt ? formatTime(msg.createdAt) : '';
    const timeKey = `${mine ? 'me' : 'other'}_${t}`;
    const showTime = !!t && timeKey !== lastTimeKey;
    // Bundle B: read receipt "1" badge for own unread messages
    const showReadBadge = mine && msg.readByOther === false;
    let metaHtml = '';
    if (showReadBadge || showTime) {
      const readPart = showReadBadge ? `<span class="chat-read-badge">1</span>` : '';
      const timePart = showTime ? `<span class="chat-time-inline">${escapeHtml(t)}</span>` : '';
      metaHtml = `<div class="chat-msg-meta">${readPart}${timePart}</div>`;
    }
    html += `
      <div class="chat-msg ${mine ? 'chat-mine' : 'chat-other'}">
        <div class="chat-bubble">${escapeHtml(msg.text || '')}</div>
        ${metaHtml}
      </div>
    `;
    if (showTime) lastTimeKey = timeKey;
  }
  wrap.innerHTML = html;
  requestAnimationFrame(() => { wrap.scrollTop = wrap.scrollHeight; });
}

function updatePresenceLine() {
  const presenceEl = document.getElementById('chatPresence');
  if (!presenceEl) return;
  if (currentView !== 'chat') {
    presenceEl.classList.add('chat-hidden');
    return;
  }
  const txt = formatPresence(ChatState.otherPresence);
  if (txt) {
    presenceEl.textContent = txt;
    presenceEl.classList.remove('chat-hidden');
    presenceEl.classList.toggle('chat-presence-online', !!ChatState.otherPresence?.online);
  } else {
    presenceEl.classList.add('chat-hidden');
  }
}

function updateTypingBar() {
  const bar = document.getElementById('chatTypingBar');
  if (!bar) return;
  const showing = currentView === 'chat' && ChatState.otherPresence && ChatState.otherPresence.typing;
  if (showing) {
    const otherName = ChatState.role === 'parent' ? ChatState.childName : ChatState.parentName;
    const txt = document.getElementById('chatTypingText');
    if (txt) txt.textContent = (otherName || '相手') + 'が 入力中';
    bar.classList.remove('chat-hidden');
  } else {
    bar.classList.add('chat-hidden');
  }
}

// ===== In-app notification (Web Audio + Toast) =====

function playDing() {
  if (ChatState.muted) return;
  try {
    if (!_audioCtx) _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const ctx = _audioCtx;
    // Resume if suspended (autoplay policy)
    if (ctx.state === 'suspended') { try { ctx.resume(); } catch (e) {} }
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    osc.connect(gain).connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.32);
  } catch (e) {}
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.className = 'chat-toast';
  const sender = msg.senderRole === 'parent' ? ChatState.parentName : ChatState.childName;
  const preview = (msg.text || '').slice(0, 50) + ((msg.text || '').length > 50 ? '…' : '');
  const time = msg.createdAt ? formatTime(msg.createdAt) : '';
  toast.innerHTML = `
    <button class="chat-toast-close" type="button" aria-label="閉じる">✕</button>
    <div class="chat-toast-header">💬 ${escapeHtml(sender || '')}</div>
    <div class="chat-toast-body">${escapeHtml(preview)}</div>
    <div class="chat-toast-time">${escapeHtml(time)}</div>
  `;
  document.body.appendChild(toast);

  let removed = false;
  const remove = () => {
    if (removed) return;
    removed = true;
    toast.classList.add('chat-toast-fading');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 360);
  };
  const autoTimer = setTimeout(remove, 4000);

  toast.addEventListener('click', (e) => {
    if (e.target.classList.contains('chat-toast-close')) {
      e.stopPropagation();
      clearTimeout(autoTimer);
      remove();
      return;
    }
    clearTimeout(autoTimer);
    remove();
    openChatModal();
  });
}

// ===== ChatState callbacks =====

ChatState.onMessagesUpdate = () => {
  if (currentView === 'chat') {
    renderMessages();
    if (modalEl && !modalEl.classList.contains('chat-hidden')) {
      markAllAsRead().catch(() => {});
    }
  }
};

ChatState.onPairingComplete = () => {
  if (modalEl && !modalEl.classList.contains('chat-hidden')) {
    switchView('chat');
    markAllAsRead().catch(() => {});
  }
};

ChatState.onPairLost = () => {
  if (modalEl && !modalEl.classList.contains('chat-hidden')) {
    if (ChatState.role) {
      switchView(ChatState.role === 'parent' ? 'pairing-parent' : 'pairing-child');
    } else {
      switchView('role-select');
    }
  }
};

// Bundle B
ChatState.onPresenceUpdate = () => {
  updatePresenceLine();
  updateTypingBar();
};

ChatState.onIncomingMessage = (msg) => {
  const modalOpen = modalEl && !modalEl.classList.contains('chat-hidden');
  const inChatView = currentView === 'chat';
  const tabHidden = typeof document !== 'undefined' && document.hidden;
  // Skip notification when actively viewing chat
  if (modalOpen && inChatView && !tabHidden) return;
  // Always play ding (unless muted)
  playDing();
  // Toast only when tab visible (no point if tab hidden)
  if (!tabHidden) showToast(msg);
};
