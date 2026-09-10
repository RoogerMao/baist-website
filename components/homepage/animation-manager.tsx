"use client"

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"
import {
  MotionConfig,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react"
import { animateScrollTo } from "./scroll"
import { ScrollCue } from "./scroll-cue"

/**
 * How much scroll (as a fraction of the viewport) the cross-fade plays over.
 * Generous on purpose: each page fades its own blocks out/in in sequence
 * (see landing.tsx / alumni.tsx) inside a fraction of this window, with a
 * silent gap in the middle — the two pages must never be visible at once.
 */
const FADE_FRACTION = 2
/**
 * A "hold" after the landing content is fully scrolled through: the content
 * stays put while the "Meet our Alumni" cue fades in, so the fade never starts
 * the instant you scroll (and always starts from the bottom).
 */
const HOLD_FRACTION = 0.45

export interface HomeContextValue {
  /** Window scroll position in "screens" (scrollY / innerHeight), 0 at the top. */
  screens: MotionValue<number>
  /** 0 → landing fully shown, 1 → alumni fully shown (the cross-fade window). */
  fadeProgress: MotionValue<number>
  /** Ease the window to the alumni layer / back to the top. */
  scrollToAlumni: () => void
  scrollToTop: () => void
  /**
   * True when the landing content is taller than the layer, so a cue pinned to
   * the bottom of the stage would sit on top of it. The landing then renders
   * the cue in its own flow instead — see landing.tsx.
   */
  cueInline: boolean
}

/**
 * `null` outside <AnimationManager>. Consumed by the two pages so their scroll
 * cues and word reveals track the landing -> alumni transition.
 */
const HomeContext = createContext<HomeContextValue | null>(null)

export function useHome(): HomeContextValue | null {
  return useContext(HomeContext)
}

export interface AnimationManagerProps {
  /** Front layer. Fades away once the reader scrolls past its content. */
  top: ReactNode
  /** Base layer, revealed as `top` fades. */
  bottom: ReactNode
}

/** Content height beyond one viewport for a pinned layer's inner wrapper. */
function overflowOf(scroller: HTMLElement | null): number {
  if (!scroller) return 0
  const layer = scroller.parentElement
  if (!layer) return 0
  const pad = parseFloat(getComputedStyle(layer).paddingTop) || 0
  return Math.max(0, scroller.scrollHeight - (layer.clientHeight - pad))
}

/**
 * The two pages are stacked layers pinned to the viewport. Each layer's content
 * can be taller than the screen: scrolling first translates it up (a normal
 * "read" pass), and only once its bottom is reached does the landing fade OUT
 * and the alumni layer fade IN — sequential, not a cross-fade, so the two text
 * layers never ghost through each other. Driven off raw window scrollY.
 */
export function AnimationManager({ top, bottom }: AnimationManagerProps) {
  const { scrollY } = useScroll()

  const landingRef = useRef<HTMLDivElement>(null)
  const alumniRef = useRef<HTMLDivElement>(null)

  // 0 until measured (matches SSR); the layout effect fills it in before paint.
  const [vh, setVh] = useState(0)
  const [landingOverflow, setLandingOverflow] = useState(0)
  const [alumniOverflow, setAlumniOverflow] = useState(0)

  useLayoutEffect(() => {
    let frame = 0
    const measure = () => {
      setVh(window.innerHeight || 0)
      setLandingOverflow(overflowOf(landingRef.current))
      setAlumniOverflow(overflowOf(alumniRef.current))
    }
    // Synchronous first pass (before paint); later reflows are deferred a frame
    // so the ResizeObserver can't loop on its own writes.
    measure()
    const deferred = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(measure)
    }
    const observer = new ResizeObserver(deferred)
    if (landingRef.current) observer.observe(landingRef.current)
    if (alumniRef.current) observer.observe(alumniRef.current)
    window.addEventListener("resize", deferred)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener("resize", deferred)
    }
  }, [])

  const fadePx = Math.max(1, vh * FADE_FRACTION)
  const holdPx = Math.max(120, vh * HOLD_FRACTION)
  const readEnd = landingOverflow
  const holdEnd = readEnd + holdPx
  const fadeEnd = holdEnd + fadePx
  const alumniEnd = fadeEnd + alumniOverflow
  // vh keeps the pinned stage on screen for the whole timeline.
  const homeHeight =
    vh > 0 ? vh + landingOverflow + holdPx + fadePx + alumniOverflow : 0

  const screens = useTransform(scrollY, (y) => y / (vh || 1))

  // Read pass: translate each layer's content up to its last pixel.
  const landingY = useTransform(
    scrollY,
    [0, Math.max(1, readEnd)],
    [0, -landingOverflow],
  )
  const alumniY = useTransform(
    scrollY,
    [fadeEnd, Math.max(fadeEnd + 1, alumniEnd)],
    [0, -alumniOverflow],
  )

  const fadeProgress = useTransform(
    scrollY,
    [holdEnd, fadeEnd],
    [0, 1],
  )
  // Sequential, not a cross-fade: landing is fully gone (0.45) before alumni
  // starts appearing (0.55) — a silent beat of plain background between them,
  // so the two pages are never visible at the same time.
  const landingOpacity = useTransform(fadeProgress, [0, 0.45], [1, 0])
  const alumniOpacity = useTransform(fadeProgress, [0.55, 1], [0, 1])

  // Only the layer currently showing catches clicks.
  const [phase, setPhase] = useState<"landing" | "alumni">("landing")
  useMotionValueEvent(fadeProgress, "change", (v) => {
    setPhase(v >= 0.5 ? "alumni" : "landing")
  })

  const scrollToAlumni = useCallback(() => animateScrollTo(fadeEnd), [fadeEnd])
  const scrollToTop = useCallback(() => animateScrollTo(0), [])

  /* Any landing taller than its layer scrolls under a bottom-pinned cue, so
     the cue moves into the landing's own flow. Measured rather than keyed to a
     breakpoint: a short desktop window overflows just as a phone does. Stable
     against flapping — the inline cue only makes an already-overflowing layer
     taller, and dropping it only shrinks one that already fits. */
  const cueInline = landingOverflow > 0

  const context = useMemo<HomeContextValue>(
    () => ({ screens, fadeProgress, scrollToAlumni, scrollToTop, cueInline }),
    [screens, fadeProgress, scrollToAlumni, scrollToTop, cueInline],
  )

  return (
    <MotionConfig reducedMotion="user">
      <HomeContext.Provider value={context}>
        <div
          className="home"
          style={homeHeight ? { height: homeHeight } : undefined}
        >
          <div className="homeStage">
            <motion.div
              className="homeLayer"
              style={{
                opacity: alumniOpacity,
                pointerEvents: phase === "alumni" ? "auto" : "none",
              }}
            >
              <motion.div
                ref={alumniRef}
                className="homeLayerScroll"
                style={{ y: alumniY }}
              >
                {bottom}
              </motion.div>
            </motion.div>
            <motion.div
              className="homeLayer"
              style={{
                opacity: landingOpacity,
                visibility: phase === "alumni" ? "hidden" : "visible",
                pointerEvents: phase === "landing" ? "auto" : "none",
              }}
            >
              <motion.div
                ref={landingRef}
                className="homeLayerScroll"
                style={{ y: landingY }}
              >
                {top}
              </motion.div>
            </motion.div>

            {/* Pinned to the viewport (outside the translating wrapper) so it's
                visible from first load, fading out with the landing layer. Only
                when the landing fits — otherwise it would sit on top of the
                content and landing.tsx renders the cue in flow instead. */}
            {!cueInline && (
              <div
                className="homeCue"
                style={{ visibility: phase === "alumni" ? "hidden" : "visible" }}
              >
                <ScrollCue
                  direction="down"
                  label="See where you could go"
                  opacity={landingOpacity}
                  onActivate={scrollToAlumni}
                />
              </div>
            )}
          </div>
        </div>
      </HomeContext.Provider>
    </MotionConfig>
  )
}
