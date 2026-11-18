/*
 * Wattlebridge motion system.
 *
 * One small engine drives every effect on the page so timing stays coherent:
 * - [data-reveal] elements receive `.is-in` once, when they first enter the viewport.
 *   CSS owns the choreography (lines, fade, mask, wipe, rule, draw) using shared easing tokens.
 * - [data-scroll] elements receive a damped `--p` (0 → 1 while they cross the viewport).
 *   CSS maps it to restrained depth. The Perth arches use spring-driven compositor transforms.
 *   Geometry reads are batched before writes; there are no React renders per frame.
 * - Anchor navigation uses an eased, interruptible scroll. Native wheel, touch and keyboard
 *   scrolling are never intercepted.
 *
 * Content is visible by default. Hidden starting states only apply under `html.motion-on`,
 * which is removed if initialisation fails, the user prefers reduced motion, or a failsafe fires.
 */

const reducedQuery = '(prefers-reduced-motion: reduce)'

export function prefersReducedMotion() {
  return typeof matchMedia === 'function' && matchMedia(reducedQuery).matches
}

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value))

let failsafe = 0

/** Called before the first render so above-the-fold reveals never flash. */
export function prepareMotion() {
  const root = document.documentElement
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    root.classList.add('motion-off')
    return
  }
  root.classList.add('motion-on')
  // If the engine never starts, show everything rather than leave content hidden.
  failsafe = window.setTimeout(() => {
    root.classList.remove('motion-on')
    root.classList.add('motion-off')
  }, 2500)
}

export function initMotion(): () => void {
  const root = document.documentElement
  window.clearTimeout(failsafe)
  const cleanups: Array<() => void> = []

  try {
    const reduced = prefersReducedMotion() || !('IntersectionObserver' in window)
    if (reduced) {
      root.classList.remove('motion-on')
      root.classList.add('motion-off')
    }

    /* ---------- Entrance reveals ---------- */
    const reveal = (el: Element) => el.classList.add('is-in')
    let revealObserver: IntersectionObserver | null = null
    let cancelled = false

    const startReveals = () => {
      if (cancelled) return
      const targets = document.querySelectorAll('[data-reveal]')
      if (reduced) {
        targets.forEach(reveal)
        return
      }
      // Clip and scale reveals start with no visible area, which Chromium reports as never
      // intersecting. Those are observed through their parent, which always has layout.
      const sentinels = new Map<Element, Element[]>()
      targets.forEach((el) => {
        // The opening composition always plays on load, whatever the viewport height.
        if (el.closest('.hero')) {
          reveal(el)
          return
        }
        const type = el.getAttribute('data-reveal')
        const sentinel = type === 'fade' || type === 'lines' ? el : el.parentElement ?? el
        sentinels.set(sentinel, [...(sentinels.get(sentinel) ?? []), el])
      })
      revealObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          sentinels.get(entry.target)?.forEach(reveal)
          revealObserver?.unobserve(entry.target)
        }
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0 })
      sentinels.forEach((_, sentinel) => revealObserver!.observe(sentinel))
    }

    // Wait briefly for the display face so line reveals animate the final glyph shapes.
    const fontsReady = document.fonts?.ready ?? Promise.resolve()
    const fontTimer = new Promise((resolve) => window.setTimeout(resolve, 450))
    Promise.race([fontsReady, fontTimer]).then(startReveals, startReveals)
    cleanups.push(() => {
      cancelled = true
      revealObserver?.disconnect()
    })

    /* ---------- Scroll-linked progress ---------- */
    const tracked = new Map<HTMLElement, { value: number }>()
    let frame = 0
    const place = document.querySelector<HTMLElement>('.place-figure')
    const covers = place?.querySelectorAll<HTMLElement | SVGSVGElement>('.place-shutters > *')
    const progressBar = document.querySelector<HTMLElement>('.page-progress')
    let placeValue = 0, placeVelocity = 0, placeInitialised = false
    let lastPlaceValue = -1
    let placeWidth = 1, placeHeight = 1, placeInset = .29
    let captionTimer = 0
    let imageReady = false
    let previousFrame = 0

    const measurePlace = () => {
      if (!place) return
      placeWidth = place.clientWidth || 1
      placeHeight = place.clientHeight || 1
      placeInset = parseFloat(getComputedStyle(place).getPropertyValue('--arch-inset'))
    }
    measurePlace()

    const updatePlace = (progress: number, elapsed: number) => {
      if (!place || !covers) return false
      const raw = clamp((progress - .14) * 2.6)
      const target = raw * raw * (3 - 2 * raw)
      if (!placeInitialised) {
        placeValue = target
        placeInitialised = true
      }
      // Exact critically damped spring: retain velocity on reversals, independent of refresh rate.
      const dt = elapsed / 1000
      const omega = 18
      const delta = placeValue - target
      const impulse = placeVelocity + omega * delta
      const decay = Math.exp(-omega * dt)
      placeValue = target + (delta + impulse * dt) * decay
      placeVelocity = (placeVelocity - omega * impulse * dt) * decay
      const settled = Math.abs(placeValue - target) < .00008 && Math.abs(placeVelocity) < .001
      if (settled) { placeValue = target; placeVelocity = 0 }
      const k = clamp(placeValue)
      if (k !== lastPlaceValue) {
        // Fixed, pre-rasterised covers only translate/scale. No path mutation, clipping or layout.
        const edge = (1 - k) * placeInset * placeWidth
        const gap = (1 - k) * 8
        const overlap = (1 - k) * .5
        const width = placeWidth * .5 - gap - edge
        const rx = width * .5 * (1 - k)
        const ry = Math.min(placeHeight * .45, rx)
        const top = (1 - k) * placeHeight * .12
        covers[0].style.transform = `scaleX(${edge + overlap})`
        covers[1].style.transform = `scaleX(${edge + overlap})`
        covers[2].style.transform = `translate3d(${-gap - overlap}px,0,0) scaleX(${(gap + overlap) * 2})`
        covers[3].style.transform = `scaleY(${top + overlap})`
        const positions = [[edge, 0, 1], [placeWidth * .5 - gap, 0, -1], [placeWidth * .5 + gap, top, 1], [placeWidth - edge, top, -1]]
        positions.forEach(([x, y, direction], index) => {
          covers[index + 4].style.transform = `translate3d(${x}px,${y}px,0) scale(${direction * rx / 512},${ry / 512})`
        })
        place.classList.add('is-arch-ready')
        place.classList.toggle('is-panorama', k === 1)
        lastPlaceValue = k
      }
      if (k < 1) {
        clearTimeout(captionTimer)
        captionTimer = 0
        place.classList.remove('is-open')
      } else if (imageReady && !captionTimer && !place.classList.contains('is-open')) {
        // Let the complete panorama paint before beginning the separate text entrance.
        captionTimer = window.setTimeout(() => {
          place.classList.add('is-open')
          captionTimer = 0
        }, 160)
      }
      return !settled
    }

    const measure = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      return clamp((vh - rect.top) / (vh + rect.height))
    }

    const tick = (time = performance.now()) => {
      frame = 0
      const elapsed = previousFrame ? Math.min(time - previousFrame, 50) : 16.67
      previousFrame = time
      const vh = window.innerHeight
      const max = document.documentElement.scrollHeight - vh
      const y = window.scrollY
      // Finish all geometry reads before any writes; SVG/style updates previously forced reflow.
      const targets = reduced ? [] : [...tracked].map(([el, state]) => ({ el, state, target: measure(el) }))
      if (progressBar) progressBar.style.transform = `scaleX(${max > 0 ? clamp(y / max) : 0})`
      root.classList.toggle('is-scrolled', y > 12)

      if (reduced) return
      let settling = false
      for (const { el, state, target } of targets) {
        if (el === place) {
          settling = updatePlace(target, elapsed) || settling
          continue
        }
        let next = state.value + (target - state.value) * .14
        if (Math.abs(target - next) < 0.0008) next = target
        else settling = true
        if (next !== state.value || !el.style.getPropertyValue('--p')) {
          state.value = next
          el.style.setProperty('--p', next.toFixed(4))
        }
      }
      if (settling) frame = requestAnimationFrame(tick)
      else previousFrame = 0
    }

    const kick = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const placeImage = place?.querySelector<HTMLImageElement>('.place-media img')
    placeImage?.decode().catch(() => {}).then(() => {
      if (!cancelled) { imageReady = true; kick() }
    })
    const resize = () => { measurePlace(); lastPlaceValue = -1; kick() }

    if (!reduced) {
      const scrollObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement
          if (entry.isIntersecting) {
            if (!tracked.has(el)) {
              const value = measure(el)
              tracked.set(el, { value })
              el.style.setProperty('--p', value.toFixed(4))
            }
          } else {
            tracked.delete(el)
          }
        }
        kick()
      }, { rootMargin: '25% 0px 25% 0px' })
      document.querySelectorAll<HTMLElement>('[data-scroll]').forEach((el) => scrollObserver.observe(el))
      cleanups.push(() => scrollObserver.disconnect())
    }

    window.addEventListener('scroll', kick, { passive: true })
    window.addEventListener('resize', resize)
    kick()
    cleanups.push(() => {
      window.removeEventListener('scroll', kick)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(frame)
      clearTimeout(captionTimer)
    })
  } catch {
    root.classList.remove('motion-on')
    root.classList.add('motion-off')
    document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in'))
  }

  return () => cleanups.forEach((cleanup) => cleanup())
}

/* ---------- Eased anchor navigation ---------- */

let stopActiveScroll: (() => void) | null = null

const easeInOutQuart = (t: number) => (t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2)

/** Scrolls so `target` starts just below the sticky header. Any user input interrupts it. */
export function scrollToTarget(target: HTMLElement | null, onArrive?: () => void) {
  stopActiveScroll?.()
  const header = document.querySelector<HTMLElement>('.site-header')
  const offset = header ? header.getBoundingClientRect().height : 0
  const goal = () => {
    if (!target || target.id === 'top') return 0
    const max = document.documentElement.scrollHeight - window.innerHeight
    return clamp(target.getBoundingClientRect().top + window.scrollY - offset, 0, max)
  }

  const start = window.scrollY
  const distance = Math.abs(goal() - start)
  if (prefersReducedMotion() || distance < 2) {
    window.scrollTo({ top: goal(), behavior: 'instant' })
    onArrive?.()
    return
  }

  const duration = clamp(380 + distance * 0.2, 500, 1050)
  const began = performance.now()
  let id = 0
  const interrupts = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const

  const stop = () => {
    cancelAnimationFrame(id)
    interrupts.forEach((type) => window.removeEventListener(type, stop))
    stopActiveScroll = null
  }

  const step = (now: number) => {
    const t = clamp((now - began) / duration)
    // Re-read the goal each frame so lazily decoded images can never cause a miss.
    window.scrollTo({ top: start + (goal() - start) * easeInOutQuart(t), behavior: 'instant' })
    if (t < 1) id = requestAnimationFrame(step)
    else {
      stop()
      onArrive?.()
    }
  }

  interrupts.forEach((type) => window.addEventListener(type, stop, { passive: true, once: true }))
  stopActiveScroll = stop
  id = requestAnimationFrame(step)
}
