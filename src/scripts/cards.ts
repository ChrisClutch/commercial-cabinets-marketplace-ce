// Spec-sheet expand/collapse (tap, click or keyboard).
export function initSpecToggles(root: ParentNode = document) {
  root.querySelectorAll<HTMLButtonElement>('[data-spec-toggle]').forEach((btn) => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', String(open));
      const panel = document.getElementById(btn.getAttribute('aria-controls')!);
      if (panel) panel.dataset.open = String(open);
    });
  });
}

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Show/hide and reorder cards with a FLIP animation so results glide instead of jumping.
 * `order` is the list of cards to show, in display order; everything else is hidden.
 */
export function applyLayout(container: HTMLElement, all: HTMLElement[], order: HTMLElement[]) {
  const first = new Map(all.map((el) => [el, el.hidden ? null : el.getBoundingClientRect()]));
  const visible = new Set(order);
  all.forEach((el) => (el.hidden = !visible.has(el)));
  order.forEach((el) => container.appendChild(el));
  all.filter((el) => el.hidden).forEach((el) => container.appendChild(el));
  if (reduced()) return;
  for (const el of order) {
    const before = first.get(el);
    const after = el.getBoundingClientRect();
    if (before) {
      const dx = before.left - after.left, dy = before.top - after.top;
      if (dx || dy) el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }], { duration: 320, easing: 'cubic-bezier(.22,1,.36,1)' });
    } else {
      el.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 260, easing: 'cubic-bezier(.22,1,.36,1)' });
    }
  }
}
