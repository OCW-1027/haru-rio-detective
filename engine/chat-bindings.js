// engine/chat-bindings.js — Bootstrap chat module: inject entry button, init Firebase, register callbacks,
// register the PWA service worker (Bundle C).
import { initChat, ChatState } from './chat-core.js';
import { openChatModal } from './chat-ui.js';

// Bundle C: register the offline-cache service worker (separate from firebase-messaging-sw.js, which is
// registered lazily by chat-fcm.js when the user opts in to push).
function registerAppServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  // GitHub Pages serves under /haru-rio-detective/. Use absolute path so the scope is well-defined.
  navigator.serviceWorker
    .register('/haru-rio-detective/sw.js', { scope: '/haru-rio-detective/' })
    .catch((e) => console.warn('[sw] register failed:', e && e.message ? e.message : e));
}

let entryBtn = null;
let badgeEl = null;

function injectEntryButton() {
  if (entryBtn) return;
  entryBtn = document.createElement('button');
  entryBtn.id = 'chatEntryBtn';
  entryBtn.className = 'chat-entry-btn';
  entryBtn.title = 'チャット';
  entryBtn.setAttribute('aria-label', 'チャット');
  entryBtn.innerHTML = '💬<span class="chat-entry-badge chat-hidden" id="chatEntryBadge">0</span>';
  document.body.appendChild(entryBtn);
  badgeEl = document.getElementById('chatEntryBadge');
  entryBtn.addEventListener('click', () => {
    openChatModal();
  });
  // 画面を 下に スクロールしている 間は 右上の ボタンを かくす (下の ボタンと 重なって 押しまちがえない ように)。
  // 一番 上に もどると また 出る。未読が あるときは かくさない。
  const tuck = (e) => {
    const t = e && e.target;
    if (!t || !t.classList || !t.classList.contains('page') || !t.classList.contains('active')) return;
    const unread = badgeEl && !badgeEl.classList.contains('chat-hidden');
    entryBtn.classList.toggle('chat-tucked', t.scrollTop > 60 && !unread);
  };
  document.addEventListener('scroll', tuck, true);
  // 画面が 切りかわったら いったん 戻す
  const mo = new MutationObserver(() => { const a = document.querySelector('.page.active'); if (!a || a.scrollTop <= 60) entryBtn.classList.remove('chat-tucked'); });
  document.querySelectorAll('.page').forEach((pg) => mo.observe(pg, { attributes: true, attributeFilter: ['class'] }));
}

function updateBadge(count) {
  if (!badgeEl) return;
  if (!count || count <= 0) {
    badgeEl.classList.add('chat-hidden');
    badgeEl.textContent = '0';
    return;
  }
  badgeEl.classList.remove('chat-hidden');
  badgeEl.textContent = count > 99 ? '99+' : String(count);
}

// Register unread callback BEFORE initChat (so initial unread from restored pair is reflected)
ChatState.onUnreadUpdate = updateBadge;

(async function bootstrap() {
  // DOM may not be ready if script loads early; wait if needed
  if (document.readyState === 'loading') {
    await new Promise(res => document.addEventListener('DOMContentLoaded', res, { once: true }));
  }
  injectEntryButton();
  registerAppServiceWorker();
  try {
    await initChat();
    console.log('[chat] init OK', {
      uid: ChatState.user ? ChatState.user.uid.slice(0, 8) : null,
      role: ChatState.role,
      paired: !!ChatState.pairId,
    });
    updateBadge(ChatState.unreadCount);
  } catch (e) {
    console.error('[chat] init failed', e);
  }
})();
