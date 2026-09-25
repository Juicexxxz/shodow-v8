export function initParallax() {
  const scene = document.querySelector('[data-parallax-scene]')
  if (!scene || matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const target = document.querySelector('[data-parallax-target]')
  const core = document.querySelector('[data-core]')
  let px = 0, py = 0, raf = 0

  const render = () => {
    raf = 0
    if (target) target.style.transform = `translate3d(${px * -18}px, ${py * -12}px, 0) scale(1.06)`
    if (core) core.style.transform = `translate3d(${px * -8}px, ${py * -5}px, 0) rotateX(${py * -4}deg) rotateY(${px * 5}deg)`
  }

  window.addEventListener('pointermove', (event) => {
    px = event.clientX / innerWidth - .5
    py = event.clientY / innerHeight - .5
    if (!raf) raf = requestAnimationFrame(render)
  }, { passive: true })

  document.querySelectorAll('[data-tilt]').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const r = card.getBoundingClientRect()
      const x = (event.clientX - r.left) / r.width - .5
      const y = (event.clientY - r.top) / r.height - .5
      card.style.transform = `perspective(1100px) rotateX(${y * -7}deg) rotateY(${x * 9}deg) translateY(-4px)`
    })
    card.addEventListener('pointerleave', () => {
      card.style.transform = ''
    })
  })
}
