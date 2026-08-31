"use client"

import { useRef } from "react"
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
  wrap,
} from "motion/react"

const ORGANIZATIONS = [
  "Anthropic Fellows",
  "Stanford University",
  "Yale University",
  "UK AI Security Institute",
  "MATS",
  "Institute for Progress",
  "Foundation for American Innovation",
]

// px per second the strip drifts left on its own
const SPEED = 32

/**
 * Free-scroll marquee: the strip drifts continuously and can be dragged
 * ("thrown") in either direction; it loops seamlessly and pauses on hover.
 */
export function AlumniCarousel() {
  const trackRef = useRef<HTMLUListElement>(null)
  const dragging = useRef(false)
  const hovering = useRef(false)
  const offset = useMotionValue(0)
  const reduceMotion = useReducedMotion()

  // Loop: the track holds 3 copies of the list, so wrapping the offset into
  // one copy's width makes the motion seamless.
  const x = useTransform(offset, (value) => {
    const segment = trackRef.current
      ? trackRef.current.offsetWidth / 3
      : 0
    return segment ? `${wrap(-segment, 0, value)}px` : "0px"
  })

  useAnimationFrame((_, delta) => {
    if (dragging.current || hovering.current || reduceMotion) return
    offset.set(offset.get() - (SPEED * delta) / 1000)
  })

  return (
    <div
      className="alumniCarousel"
      onPointerEnter={() => (hovering.current = true)}
      onPointerLeave={() => (hovering.current = false)}
    >
      <motion.ul
        ref={trackRef}
        className="alumniTrack"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0}
        onDragStart={() => (dragging.current = true)}
        onDrag={(_, info) => offset.set(offset.get() + info.delta.x)}
        onDragEnd={() => (dragging.current = false)}
        aria-label="Where our alumni have continued their careers"
      >
        {[0, 1, 2].map((copy) =>
          ORGANIZATIONS.map((name) => (
            <li
              key={`${copy}-${name}`}
              className="alumniOrg"
              aria-hidden={copy !== 0}
            >
              {name}
            </li>
          )),
        )}
      </motion.ul>
    </div>
  )
}
