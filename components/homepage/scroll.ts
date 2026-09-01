let activeScroll = 0

/** Tween the window scroll to `targetY` over `duration` ms (eased). */
export function animateScrollTo(targetY: number, duration = 850) {
  const startY = window.scrollY
  const distance = targetY - startY
  if (Math.abs(distance) < 1) return

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches
  if (reduceMotion) {
    window.scrollTo(0, targetY)
    return
  }

  const token = ++activeScroll
  const start = performance.now()
  const ease = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

  const step = (now: number) => {
    if (token !== activeScroll) return
    const t = Math.min(1, (now - start) / duration)
    window.scrollTo(0, startY + distance * ease(t))
    if (t < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}
