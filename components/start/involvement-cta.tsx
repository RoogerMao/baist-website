"use client"

import { useRef, useState, type PointerEvent } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"

interface Ripple {
  id: number
  x: number
  y: number
  size: number
}

export interface InvolvementCtaProps {
  label: string
  href: string
  /** Use a white background instead of the card-surface tone. */
  white?: boolean
}

export function InvolvementCta({ label, href, white = false }: InvolvementCtaProps) {
  const [ripples, setRipples] = useState<Ripple[]>([])
  const nextId = useRef(0)

  function spawnRipple(event: PointerEvent<HTMLAnchorElement>) {
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
    <Link
      href={href}
      className="involvementCardCta"
      data-white={white || undefined}
      onPointerDown={spawnRipple}
    >
      <span className="involvementCardCtaLabel">{label}</span>

      <span className="involvementCardCtaRipples" aria-hidden>
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              className="involvementCardCtaRipple"
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
    </Link>
  )
}
