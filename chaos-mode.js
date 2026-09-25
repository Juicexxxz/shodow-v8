export function initChaosMode() {
  const button = document.querySelector('[data-chaos-mode]')
  const label = document.querySelector('[data-mode-label]')
  if (!button) return

  button.addEventListener('click', () => {
    const active = document.body.classList.toggle('chaos')
    button.setAttribute('aria-pressed', String(active))
    if (label) label.textContent = active ? 'Chaos Mode' : 'Normal Mode'
  })
}
