"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import {
  MotionConfig,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react"

/**
 * Window scroll position in "screens" (scrollY / innerHeight), 0 at the top.
 * `null` outside <AnimationManager>. Consumed by the pages so their scroll
 * cues can fade in step with the landing -> alumni transition.
 */
const HomeScrollContext = createContext<MotionValue<number> | null>(null)

export function useHomeScreens(): MotionValue<number> | null {
  return useContext(HomeScrollContext)
}

export interface AnimationManagerProps {
  /** Front layer. Fades away on scroll to reveal `bottom` beneath it. */
  top: ReactNode
  /** Base layer, revealed as `top` fades. */
  bottom: ReactNode
}

/**
 * The two pages are stacked layers pinned to the viewport. Scrolling fades the
 * landing layer OUT, then (through a beat of the stage's plain background) the
 * alumni layer IN — sequential, not a cross-fade, so the two text layers never
 * ghost through each other. Driven off raw window scrollY (monotonic).
 */
export function AnimationManager({ top, bottom }: AnimationManagerProps) {
  const { scrollY } = useScroll()

  const screens = useTransform(() => {
    const vh = typeof window === "undefined" ? 1 : window.innerHeight || 1
    return scrollY.get() / vh
  })

  // The transition plays over ~2 screens of scroll: landing fades out over the
  // first ~0.9, a beat of plain background, then alumni fades in by ~1.8.
  const landingOpacity = useTransform(screens, [0.15, 0.85], [1, 0])
  const alumniOpacity = useTransform(screens, [1.0, 1.7], [0, 1])

  // Only the layer currently showing catches clicks.
  const [phase, setPhase] = useState<"landing" | "alumni">("landing")
  useMotionValueEvent(scrollY, "change", (y) => {
    const vh = typeof window === "undefined" ? 1 : window.innerHeight || 1
    setPhase(y / vh > 0.95 ? "alumni" : "landing")
  })

  return (
    <MotionConfig reducedMotion="user">
      <HomeScrollContext.Provider value={screens}>
        <div className="home">
          <div className="homeStage">
            <motion.div
              className="homeLayer"
              style={{
                opacity: alumniOpacity,
                pointerEvents: phase === "alumni" ? "auto" : "none",
              }}
            >
              {bottom}
            </motion.div>
            <motion.div
              className="homeLayer"
              style={{
                opacity: landingOpacity,
                visibility: phase === "alumni" ? "hidden" : "visible",
                pointerEvents: phase === "landing" ? "auto" : "none",
              }}
            >
              {top}
            </motion.div>
          </div>
        </div>
      </HomeScrollContext.Provider>
    </MotionConfig>
  )
}
