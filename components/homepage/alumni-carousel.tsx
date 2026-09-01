"use client"

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react"
import { Avatar, Paper, Stack, Text } from "@mantine/core"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  wrap,
} from "motion/react"

export interface AlumniProfile {
  name: string
  photo?: string
  /** Most recent credentials — current position and/or additional degrees. */
  credential: string
  /** Former role in the club, e.g. "Former Member", "Former Policy Lead". */
  clubRole: string
  /** Graduation year at Brown. */
  classYear: number | string
  /** One or more concentrations, already formatted (e.g. "CS and Philosophy"). */
  concentrations: string
}

function AlumniCard({
  name,
  photo,
  credential,
  clubRole,
  classYear,
  concentrations,
}: AlumniProfile) {
  return (
    <Paper withBorder radius="md" p="md" className="alumniCard">
      <Stack gap={6} align="center">
        <Avatar
          src={photo}
          name={name}
          color="initials"
          radius="xl"
          size={48}
        />
        <Text fw={600} size="sm" ta="center" lh={1.3}>
          {name}
        </Text>
        <Text size="sm" ta="center" lh={1.35}>
          {credential}
        </Text>
        <Text size="sm" c="dimmed" fs="italic" ta="center" lh={1.35}>
          {clubRole}
        </Text>
        <Text c="dimmed" size="xs" ta="center" lh={1.35}>
          Class of {classYear}, {concentrations}
        </Text>
      </Stack>
    </Paper>
  )
}

/**
 * Infinitely looping, drag-scrubbable row of alumni profiles
 * (motion.dev/examples/react-carousel-loop). Three copies of the list are
 * rendered and the track's x is wrapped over one copy's width, so the seam is
 * never visible. Movement is drag-only — no automatic scrolling.
 */
export function AlumniCarousel({ profiles }: { profiles: AlumniProfile[] }) {
  const count = profiles.length
  const x = useMotionValue(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const [copyWidth, setCopyWidth] = useState(0)
  const [step, setStep] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)

  const drag = useRef<{ pointerId: number; startX: number; startValue: number } | null>(
    null,
  )

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current
      if (!track || track.children.length < 2) return
      setCopyWidth(track.scrollWidth / 3)
      setStep(
        (track.children[1] as HTMLElement).offsetLeft -
          (track.children[0] as HTMLElement).offsetLeft,
      )
    }
    measure()
    const observer = new ResizeObserver(measure)
    if (trackRef.current) observer.observe(trackRef.current)
    return () => observer.disconnect()
  }, [profiles])

  // keep the active dot in sync with the track position
  useMotionValueEvent(x, "change", (value) => {
    if (step === 0 || count === 0) return
    setActiveIndex(((Math.round(-value / step) % count) + count) % count)
  })

  const onPointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      drag.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startValue: x.get(),
      }
      event.currentTarget.setPointerCapture(event.pointerId)
    },
    [x],
  )

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const current = drag.current
      if (!current || copyWidth === 0) return
      const next = current.startValue + (event.clientX - current.startX)
      x.set(wrap(-copyWidth, 0, next))
    },
    [x, copyWidth],
  )

  const endDrag = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (drag.current?.pointerId === event.pointerId) drag.current = null
  }, [])

  // Move by `cards` cards (can be negative), wrapping x back into one copy's
  // width once settled so the three-copy loop never runs out.
  const scrollBy = useCallback(
    (cards: number) => {
      if (step === 0 || copyWidth === 0 || cards === 0) return
      animate(x, x.get() - cards * step, {
        type: "spring",
        stiffness: 260,
        damping: 30,
        onComplete: () => x.set(wrap(-copyWidth, 0, x.get())),
      })
    },
    [x, step, copyWidth],
  )

  const goTo = useCallback(
    (index: number) => {
      if (count === 0) return
      let delta = index - activeIndex
      // take the shorter way round the loop
      if (delta > count / 2) delta -= count
      if (delta < -count / 2) delta += count
      scrollBy(delta)
    },
    [count, activeIndex, scrollBy],
  )

  const loop = [...profiles, ...profiles, ...profiles]

  return (
    <div className="alumniCarousel">
      <motion.button
        type="button"
        className="alumniCarouselArrow alumniCarouselArrow--prev"
        aria-label="Previous alumni"
        onClick={() => scrollBy(-1)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <IconChevronLeft stroke={1.75} />
      </motion.button>

      <div className="alumniCarouselViewport">
        <motion.div
          ref={trackRef}
          className="alumniTrack"
          style={{ x }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {loop.map((profile, index) => (
            <AlumniCard key={index} {...profile} />
          ))}
        </motion.div>
      </div>

      <motion.button
        type="button"
        className="alumniCarouselArrow alumniCarouselArrow--next"
        aria-label="Next alumni"
        onClick={() => scrollBy(1)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <IconChevronRight stroke={1.75} />
      </motion.button>

      <div className="alumniDots" role="tablist" aria-label="Alumni">
        {profiles.map((_, index) => (
          <button
            key={index}
            type="button"
            className="alumniDot"
            data-active={index === activeIndex || undefined}
            aria-label={`Go to alumnus ${index + 1}`}
            aria-selected={index === activeIndex}
            role="tab"
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </div>
  )
}
