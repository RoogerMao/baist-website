"use client"

import { useRef, useState, type PointerEvent } from "react"
import { IconArrowDown, IconArrowUp } from "@tabler/icons-react"
import {
  AnimatePresence,
  motion,
  useTransform,
  type MotionValue,
} from "motion/react"

interface Ripple {
  id: number
  x: number
  y: number
  size: number
}

export interface ScrollCueProps {
  direction: "up" | "down"
  label: string
  /** Invoked on click — eases the window to the other home layer. */
  onActivate: () => void
  /** Drives the fade so the cue tracks the landing → alumni transition. */
  opacity: MotionValue<number>
  className?: string
}

export function ScrollCue({
  direction,
  label,
  onActivate,
  opacity,
  className,
}: ScrollCueProps) {
  const Icon = direction === "up" ? IconArrowUp : IconArrowDown
  // don't catch clicks while faded out
  const pointerEvents = useTransform(opacity, (v) => (v > 0.05 ? "auto" : "none"))

  const [ripples, setRipples] = useState<Ripple[]>([])
  const nextId = useRef(0)

  function spawnRipple(event: PointerEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height) * 2
    setRipples((current) => [
      ...current,
      {
        id: nextId.current++,
        size,
        x: event.clientX - rect.left - size / 2,
        y: event.clientY - rect.top - size / 2,
      },
    ])
  }

  return (
    <motion.button
      type="button"
      className={`cueText cueButton${className ? ` ${className}` : ""}`}
      style={{ opacity, pointerEvents }}
      onPointerDown={spawnRipple}
      onClick={onActivate}
    >
      {direction === "up" && <Icon stroke={1.5} />}
      {label}
      {direction === "down" && <Icon stroke={1.5} />}

      <span className="cueButtonRipples" aria-hidden>
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              className="cueButtonRipple"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: ripple.size,
                height: ripple.size,
              }}
              initial={{ scale: 0, opacity: 0.35 }}
              animate={{ scale: 1, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              onAnimationComplete={() =>
                setRipples((current) =>
                  current.filter((item) => item.id !== ripple.id),
                )
              }
            />
          ))}
        </AnimatePresence>
      </span>
    </motion.button>
  )
}
