"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { MotionConfig, motion } from "motion/react"

type View = "top" | "bottom"

interface PageNav {
  view: View
  goDown: () => void
  goUp: () => void
}

const PageNavContext = createContext<PageNav | null>(null)

export function usePageNav(): PageNav {
  const ctx = useContext(PageNavContext)
  if (!ctx) {
    throw new Error("usePageNav must be used inside <AnimationManager>")
  }
  return ctx
}

const EASE = [0.16, 1, 0.3, 1] as const
const DURATION = 0.9

export interface AnimationManagerProps {
  top: ReactNode
  bottom: ReactNode
}

export function AnimationManager({ top, bottom }: AnimationManagerProps) {
  const [view, setView] = useState<View>("top")

  const goDown = useCallback(() => setView("bottom"), [])
  const goUp = useCallback(() => setView("top"), [])
  const nav = useMemo<PageNav>(() => ({ view, goDown, goUp }), [view, goDown, goUp])

  const atTop = view === "top"

  const topRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    topRef.current?.toggleAttribute("inert", !atTop)
    bottomRef.current?.toggleAttribute("inert", atTop)
  }, [atTop])

  return (
    <PageNavContext.Provider value={nav}>
      <MotionConfig reducedMotion="user">
        <div className="am-stage">
          <motion.div
            ref={topRef}
            className="am-layer"
            initial={false}
            animate={{
              scale: atTop ? 1 : 1.35,
              opacity: atTop ? 1 : 0,
              filter: atTop ? "blur(0px)" : "blur(6px)",
            }}
            transition={{ duration: DURATION, ease: EASE }}
            style={{ zIndex: 2, pointerEvents: atTop ? "auto" : "none" }}
          >
            {top}
          </motion.div>

          <motion.div
            ref={bottomRef}
            className="am-layer"
            initial={false}
            animate={{
              scale: atTop ? 1.12 : 1,
              opacity: atTop ? 0 : 1,
            }}
            transition={{ duration: DURATION, ease: EASE }}
            style={{ zIndex: 1, pointerEvents: atTop ? "none" : "auto" }}
          >
            {bottom}
          </motion.div>
        </div>
      </MotionConfig>
    </PageNavContext.Provider>
  )
}
