"use client"

import { useRef, useState, type PointerEvent } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import { Stack, Text } from "@mantine/core"

export interface LandingLinkProps {
  /** Destination route. */
  href: string
  /** URL of the icon shown on the left of the button. */
  iconSrc: string
  /** Primary label — rendered bold and larger. */
  title: string
  /** Optional supporting text — rendered smaller. */
  description?: string
  /** When true, fill the button with the accent color. */
  highlight?: boolean
}

interface Ripple {
  id: number
  x: number
  y: number
  size: number
}

export function LandingLink({
  href,
  iconSrc,
  title,
  description,
  highlight = false,
}: LandingLinkProps) {
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
      className="landingLink"
      data-highlight={highlight || undefined}
      onPointerDown={spawnRipple}
    >
      <span
        aria-hidden
        className="landingLinkIcon"
        style={{ maskImage: `url(${iconSrc})`, WebkitMaskImage: `url(${iconSrc})` }}
      />
      <Stack gap={2} style={{ minWidth: 0 }}>
        <Text fw={700} fz="lg" lh={1.2}>
          {title}
        </Text>
        {description ? (
          <Text fz="sm" style={{ opacity: 0.75 }}>
            {description}
          </Text>
        ) : null}
      </Stack>

      <span className="landingLinkRipples" aria-hidden>
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              className="landingLinkRipple"
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
