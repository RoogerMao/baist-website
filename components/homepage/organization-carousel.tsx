"use client"

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
} from "react"
import { Avatar, Paper, Text, Title } from "@mantine/core"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  wrap,
} from "motion/react"

export interface Organization {
  /** Organization name — the card's title. */
  name: string
  /** URL of the organization's logo. Falls back to initials. */
  logo?: string
  /**
   * Optional short label for what they do in AI safety, e.g. "Model
   * Benchmarking". Omit it where the name already says as much.
   */
  focus?: string
  /** Optional destination — a click (not a drag) opens it in a new tab. */
  url?: string
  /**
   * Crop the logo to fill the square tile instead of fitting it inside.
   * For marks that carry their own background to the edge.
   */
  logoFill?: boolean
}

/** Pointer travel, in px, past which a press counts as a drag, not a click. */
const DRAG_SLOP = 5

/**
 * Two columns: the logo on the left, the title and focus label stacked in a
 * column to its right. The logo is the link — the rest of the card stays
 * selectable — and hovering anywhere on the card tints the title to
 * advertise it.
 */
function OrganizationCard({
  name,
  logo,
  focus,
  url,
  logoFill,
}: Organization) {
  return (
    <Paper
      withBorder
      radius="md"
      p="lg"
      className="orgCard"
      data-linked={url ? true : undefined}
    >
      <Avatar
        src={logo}
        name={name}
        color="initials"
        radius="md"
        size={64}
        className="orgCardLogo"
        data-fill={logoFill || undefined}
        {...(url
          ? {
              component: "a" as const,
              href: url,
              target: "_blank",
              rel: "noopener noreferrer",
              "aria-label": `${name} — about page`,
            }
          : {})}
      />
      <div className="orgCardText">
        <Title order={3} fz="h4" lh={1.2} m={0} className="orgCardTitle">
          {name}
        </Title>
        {focus ? (
          <Text size="sm" c="dimmed" lh={1.35} className="orgCardFocus">
            {focus}
          </Text>
        ) : null}
      </div>
    </Paper>
  )
}

/**
 * Infinitely looping, drag-scrubbable row of organizations
 * (motion.dev/examples/react-carousel-loop). Three copies of the list are
 * rendered and the track's x is wrapped over one copy's width, so the seam is
 * never visible. Movement is drag-only — no automatic scrolling.
 */
export function OrganizationCarousel({
  organizations,
}: {
  organizations: Organization[]
}) {
  const count = organizations.length
  const x = useMotionValue(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const [copyWidth, setCopyWidth] = useState(0)
  const [step, setStep] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)

  const drag = useRef<{ pointerId: number; startX: number; startValue: number } | null>(
    null,
  )
  // Set once a press travels past DRAG_SLOP; read by the capture-phase click
  // handler so scrubbing the track never follows a card's link.
  const dragged = useRef(false)

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
  }, [organizations])

  // keep the active dot in sync with the track position
  useMotionValueEvent(x, "change", (value) => {
    if (step === 0 || count === 0) return
    setActiveIndex(((Math.round(-value / step) % count) + count) % count)
  })

  const onPointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      dragged.current = false
      drag.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startValue: x.get(),
      }
      // NB: the pointer is captured lazily, in onPointerMove — capturing here
      // would retarget the click to the track and a linked card would never
      // see it.
    },
    [x],
  )

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const current = drag.current
      if (!current || copyWidth === 0) return
      const travel = event.clientX - current.startX
      if (!dragged.current && Math.abs(travel) > DRAG_SLOP) {
        dragged.current = true
        // Take the pointer only now that it's a drag, so the track keeps
        // following it past its own bounds.
        event.currentTarget.setPointerCapture(current.pointerId)
      }
      const next = current.startValue + travel
      x.set(wrap(-copyWidth, 0, next))
    },
    [x, copyWidth],
  )

  const endDrag = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (drag.current?.pointerId === event.pointerId) drag.current = null
  }, [])

  // A drag ends with a click on whichever card sat under the pointer; swallow
  // it before the anchor sees it. Keyboard activation never sets `dragged`.
  const onClickCapture = useCallback((event: MouseEvent<HTMLDivElement>) => {
    if (!dragged.current) return
    event.preventDefault()
    event.stopPropagation()
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

  const loop = [...organizations, ...organizations, ...organizations]

  return (
    <div className="alumniCarousel">
      <motion.button
        type="button"
        className="alumniCarouselArrow alumniCarouselArrow--prev"
        aria-label="Previous organization"
        onClick={() => scrollBy(-1)}
        style={{ y: "-50%" }}
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
          onClickCapture={onClickCapture}
        >
          {loop.map((organization, index) => (
            <OrganizationCard key={index} {...organization} />
          ))}
        </motion.div>
      </div>

      <motion.button
        type="button"
        className="alumniCarouselArrow alumniCarouselArrow--next"
        aria-label="Next organization"
        onClick={() => scrollBy(1)}
        style={{ y: "-50%" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <IconChevronRight stroke={1.75} />
      </motion.button>

      <p className="alumniDisclaimer alumniDisclaimer--logos">
        Use of organizational logos does not imply affiliation with or
        endorsement by these organizations.
      </p>

      <div className="alumniDots" role="tablist" aria-label="Organizations">
        {organizations.map((_, index) => (
          <button
            key={index}
            type="button"
            className="alumniDot"
            data-active={index === activeIndex || undefined}
            aria-label={`Go to organization ${index + 1}`}
            aria-selected={index === activeIndex}
            role="tab"
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </div>
  )
}
