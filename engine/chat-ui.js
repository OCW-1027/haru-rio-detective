// engine/chat-ui.js — Chat modal UI: role/pairing/chat/settings views
import {
  ChatState, setRole, setNames, generatePairingCode, pairWithCode,
  sendMessage, markAllAsRead, resetPairing
} from './chat-core.js';

let modalEl = null;
let currentView = null;

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

function ensureModal() {
  if (modalEl) return modalEl;
  modalEl = document.createElement('div');
  modalEl.className = 'chat-modal chat-hidden';
  modalEl.innerHTML = `
    <div class="chat-modal-content">
      <div class="chat-topbar">
        <button class="chat-back" id="chatBack">← 닫기</button>
        <div class="chat-title" id="chatTitle">채팅</div>
        <button class="chat-settings chat-hidden" id="chatSettings">⚙</button>
      </div>
      <div class="chat-body" id="chatBody"></div>
      <div class="chat-input-bar chat-hidden" id="chatInputBar">
        <textarea class="chat-input" id="chatInput" rows="1" placeholder="메시지 입력..."></textarea>
        <button class="chat-send" id="chatSend">전송</button>
      </div>
    </div>
  `;
  document.body.appendChild(modalEl);

  document.getElementById('chatBack').onclick = closeChatModal;
  document.getElementById('chatSettings').onclick = () => switchView('settings');
  document.getElementById('chatSend').onclick = handleSend;
  const inputEl = document.getElementById('chatInput');
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  });
  // Auto-grow textarea (modest)
  inputEl.addEventListener('input', () => {
    inputEl.style.height = 'auto';
    inputEl.style.height = Math.min(inputEl.scrollHeight, 120) + 'px';
  });
  return modalEl;
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
    alert('전송 실패: ' + (e.message || e));
  }
}

export function openChatModal() {
  ensureModal();
  modalEl.classList.remove('chat-hidden');
  if (!ChatState.isReady) {
    // Auth not ready yet — show simple loading state via role-select with disabled msg
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
}

function switchView(view) {
  ensureModal();
  currentView = view;
  const body = document.getElementById('chatBody');
  const inputBar = document.getElementById('chatInputBar');
  const settingsBtn = document.getElementById('chatSettings');
  const titleEl = document.getElementById('chatTitle');

  // Defaults: hide input + settings
  inputBar.classList.add('chat-hidden');
  settingsBtn.classList.add('chat-hidden');

  if (view === 'loading') {
    titleEl.textContent = '채팅';
    body.innerHTML = `<div class="chat-role-select"><h2>준비 중...</h2><p>Firebase 연결 중. 잠시 기다려 주세요.</p></div>`;
    return;
  }

  if (view === 'role-select') {
    titleEl.textContent = '역할 선택';
    body.innerHTML = `
      <div class="chat-role-select">
        <h2>채팅 시작</h2>
        <p>당신은 누구인가요?</p>
        <button class="chat-role-btn" data-role="parent">내가 부모</button>
        <button class="chat-role-btn" data-role="child">내가 자녀(하루)</button>
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
    titleEl.textContent = '페어링 (부모)';
    settingsBtn.classList.remove('chat-hidden');
    body.innerHTML = `
      <div class="chat-pair-parent">
        <h2>자녀 기기와 연결</h2>
        <button id="chatGenCode" class="chat-action-btn">페어링 코드 만들기</button>
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
          '5분 안에 자녀 기기에서 입력하세요. 자녀가 입력하면 자동으로 채팅이 시작됩니다.';
        btn.classList.add('chat-hidden');
      } catch (e) {
        btn.disabled = false;
        alert('코드 생성 실패: ' + (e.message || e));
      }
    };
    return;
  }

  if (view === 'pairing-child') {
    titleEl.textContent = '페어링 (자녀)';
    settingsBtn.classList.remove('chat-hidden');
    body.innerHTML = `
      <div class="chat-pair-child">
        <h2>부모 코드 입력</h2>
        <input type="text" id="chatPairCode" inputmode="numeric" maxlength="6" placeholder="000000" autocomplete="off">
        <button id="chatPairConfirm" class="chat-action-btn">확인</button>
        <div class="chat-help">부모님 화면에 표시된 6자리 숫자를 입력해주세요.</div>
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
        errEl.textContent = '6자리 숫자를 입력하세요';
        errEl.classList.remove('chat-hidden');
        return;
      }
      confirmBtn.disabled = true;
      try {
        await pairWithCode(code);
      } catch (e) {
        confirmBtn.disabled = false;
        errEl.textContent = e.message || '페어링 실패';
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
    titleEl.textContent = otherName || '채팅';
    inputBar.classList.remove('chat-hidden');
    settingsBtn.classList.remove('chat-hidden');
    body.innerHTML = `<div class="chat-messages" id="chatMessages"></div>`;
    renderMessages();
    return;
  }

  if (view === 'settings') {
    titleEl.textContent = '설정';
    body.innerHTML = `
      <div class="chat-settings-view">
        <label>부모 호칭
          <input type="text" id="chatParentName" maxlength="12" value="${escapeHtml(ChatState.parentName)}">
        </label>
        <label>자녀 호칭
          <input type="text" id="chatChildName" maxlength="12" value="${escapeHtml(ChatState.childName)}">
        </label>
        <button id="chatSaveNames" class="chat-action-btn">호칭 저장</button>
        <hr>
        <button id="chatBackToChat" class="chat-action-btn">← 돌아가기</button>
        <button id="chatResetPair" class="chat-danger-btn">페어링 초기화</button>
      </div>
    `;
    document.getElementById('chatSaveNames').onclick = async () => {
      const pn = (document.getElementById('chatParentName').value || '').trim() || '아빠';
      const cn = (document.getElementById('chatChildName').value || '').trim() || '하루';
      try {
        await setNames({ parentName: pn, childName: cn });
        alert('호칭이 저장되었습니다.');
      } catch (e) {
        alert('저장 실패: ' + (e.message || e));
      }
    };
    document.getElementById('chatBackToChat').onclick = () => {
      if (ChatState.pairId) switchView('chat');
      else if (ChatState.role) switchView(ChatState.role === 'parent' ? 'pairing-parent' : 'pairing-child');
      else switchView('role-select');
    };
    document.getElementById('chatResetPair').onclick = () => {
      if (!confirm('페어링을 초기화합니까? 메시지는 상대방 기기에 남아있습니다.')) return;
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
    // Dedupe time label: same side + same minute => skip
    const timeKey = `${mine ? 'me' : 'other'}_${t}`;
    const showTime = !!t && timeKey !== lastTimeKey;
    html += `
      <div class="chat-msg ${mine ? 'chat-mine' : 'chat-other'}">
        <div class="chat-bubble">${escapeHtml(msg.text || '')}</div>
        ${showTime ? `<div class="chat-time">${escapeHtml(t)}</div>` : ''}
      </div>
    `;
    if (showTime) lastTimeKey = timeKey;
  }
  wrap.innerHTML = html;
  // Auto-scroll to bottom
  requestAnimationFrame(() => { wrap.scrollTop = wrap.scrollHeight; });
}

// Hook ChatState callbacks
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
  // If currently in chat view, drop to pairing screen
  if (modalEl && !modalEl.classList.contains('chat-hidden')) {
    if (ChatState.role) {
      switchView(ChatState.role === 'parent' ? 'pairing-parent' : 'pairing-child');
    } else {
      switchView('role-select');
    }
  }
};
