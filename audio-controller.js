export function initAudioController() {
  const button = document.querySelector('[data-audio-toggle]')
  if (!button) return

  let ctx = null
  let master = null
  let enabled = false

  function setup() {
    if (ctx) return
    ctx = new AudioContext()
    master = ctx.createGain()
    master.gain.value = .026
    master.connect(ctx.destination)
  }

  function tone(frequency = 180, duration = .07, type = 'sine') {
    if (!ctx || !enabled) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = type
    osc.frequency.value = frequency
    gain.gain.setValueAtTime(.0001, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(.08, ctx.currentTime + .012)
    gain.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + duration)
    osc.connect(gain).connect(master)
    osc.start()
    osc.stop(ctx.currentTime + duration + .02)
  }

  button.addEventListener('click', async () => {
    setup()
    if (ctx.state === 'suspended') await ctx.resume()
    enabled = !enabled
    button.setAttribute('aria-pressed', String(enabled))
    button.textContent = enabled ? '◉' : '◌'
    tone(enabled ? 110 : 78, .11)
  })

  document.querySelectorAll('.btn, .nav-links a, [data-tilt]').forEach((el) => {
    el.addEventListener('mouseenter', () => tone(230, .035, 'triangle'))
  })
}
