
import '../css/main.css'
import { initParticles } from './engine/particles.js'

initParticles()

window.addEventListener('load', () => {
  setTimeout(() => document.querySelector('#loader')?.classList.add('done'), 900)
})

const progress = document.querySelector('[data-progress]')
const updateProgress = () => {
  const max = document.documentElement.scrollHeight - innerHeight
  if (progress) progress.style.width = `${max > 0 ? scrollY / max * 100 : 0}%`
}
addEventListener('scroll', updateProgress, { passive: true })
updateProgress()

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return
    entry.target.classList.add('is-visible')
    entry.target.querySelectorAll?.('[data-meter]').forEach(m => m.style.width = m.dataset.meter + '%')
    observer.unobserve(entry.target)
  })
}, { threshold: .12 })
document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

// Hero parallax
const heroImage = document.querySelector('[data-parallax-target]')
if (heroImage && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let tx = 0, ty = 0, raf = 0
  const draw = () => {
    raf = 0
    heroImage.style.transform = `translate3d(${tx}px,${ty}px,0) scale(1.08)`
  }
  addEventListener('pointermove', (e) => {
    tx = (e.clientX / innerWidth - .5) * -18
    ty = (e.clientY / innerHeight - .5) * -11
    if (!raf) raf = requestAnimationFrame(draw)
  }, { passive:true })
}

// Card tilt
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('pointermove', e => {
    const r = card.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - .5
    const y = (e.clientY - r.top) / r.height - .5
    card.style.transform = `perspective(1200px) rotateX(${y * -6}deg) rotateY(${x * 7}deg) translateY(-4px)`
  })
  card.addEventListener('pointerleave', () => card.style.transform = '')
})

// Image lightbox
const lightbox = document.querySelector('#lightbox')
const lightboxImg = document.querySelector('#lightbox-img')
const closeLightbox = () => lightbox?.classList.remove('open')
document.querySelectorAll('[data-lightbox]').forEach(btn => {
  btn.addEventListener('click', () => {
    if (!lightbox || !lightboxImg) return
    lightboxImg.src = btn.dataset.lightbox
    lightbox.classList.add('open')
  })
})
document.querySelector('[data-close-lightbox]')?.addEventListener('click', closeLightbox)
lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox() })
addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox() })

// Chaos mode
const chaosButton = document.querySelector('[data-chaos]')
const modeLabel = document.querySelector('[data-mode-label]')
chaosButton?.addEventListener('click', () => {
  document.body.classList.toggle('chaos-mode')
  const active = document.body.classList.contains('chaos-mode')
  chaosButton.setAttribute('aria-pressed', String(active))
  if (modeLabel) modeLabel.textContent = active ? 'Chaos Mode' : 'Normal Mode'
})
