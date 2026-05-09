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
