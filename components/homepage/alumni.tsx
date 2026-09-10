"use client"

import { useRef, useState, type PointerEvent } from "react"
import Link from "next/link"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "motion/react"
import { OrganizationCarousel } from "./organization-carousel"
import { ORGANIZATIONS } from "./organizations-data"
import { ScrollCue } from "./scroll-cue"
import { useHome } from "./animation-manager"

import disclaimer from "./disclaimer.module.css"

const MotionLink = motion.create(Link)

interface Ripple {
  id: number
  x: number
  y: number
  size: number
}

/**
 * Fade-in order entering the alumni page (scrolling down) — the reverse of
 * the landing's leaving order: hero, subheading, CTA, then the carousel. Each
 * range sits inside the manager's alumni-enter window (fadeProgress 0.55 ->
 * 1). Scrolling back up reverses it automatically.
 */
const HERO_RANGE: [number, number] = [0.55, 0.7]
const SUBHEADING_RANGE: [number, number] = [0.68, 0.83]
const CTA_RANGE: [number, number] = [0.81, 0.92]
const CAROUSEL_RANGE: [number, number] = [0.9, 1]

export function Alumni() {
  const home = useHome()
  const fallback = useMotionValue(0)
  const fadeProgress = home?.fadeProgress ?? fallback

  // The up-cue only appears once the whole alumni sequence has settled.
  const cueOpacity = useTransform(fadeProgress, [0.9, 1], [0, 1])

  const heroOpacity = useTransform(fadeProgress, HERO_RANGE, [0, 1])
  const subheadingOpacity = useTransform(fadeProgress, SUBHEADING_RANGE, [0, 1])
  const ctaOpacity = useTransform(fadeProgress, CTA_RANGE, [0, 1])
  const carouselOpacity = useTransform(fadeProgress, CAROUSEL_RANGE, [0, 1])

  // The underline sweep is only armed once the alumni sequence has settled.
  const [focused, setFocused] = useState(false)
  useMotionValueEvent(fadeProgress, "change", (v) => setFocused(v >= 0.99))

  // Material-style press ripple on the CTA, matching the scroll cues.
  const [ripples, setRipples] = useState<Ripple[]>([])
  const nextRippleId = useRef(0)

  function spawnRipple(event: PointerEvent<HTMLAnchorElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height) * 2
    setRipples((current) => [
      ...current,
      {
        id: nextRippleId.current++,
        size,
        x: event.clientX - rect.left - size / 2,
        y: event.clientY - rect.top - size / 2,
      },
    ])
  }

  return (
    <div
      className="alumniPage homeSection"
      data-focused={focused || undefined}
    >
      <ScrollCue
        direction="up"
        label="BAIST"
        opacity={cueOpacity}
        onActivate={() => home?.scrollToTop()}
        className="cueText--top"
      />

      <div className="homeContent">
        <div className="alumniIntro">
          <motion.h1 className="hero" style={{ opacity: heroOpacity }}>
            We build our careers{" "}
            <span className="heroUnderline">
              while preparing the world for future, more advanced models
            </span>
            .
          </motion.h1>

          <div className="alumniCtaRow">
            <motion.p
              className="subheading"
              style={{ opacity: subheadingOpacity }}
            >
              Our alumni have collaborated with the following organizations.
            </motion.p>

            <MotionLink
              href="/start"
              className="alumniCta"
              style={{ opacity: ctaOpacity }}
              onPointerDown={spawnRipple}
            >
              <span>Learn how to join</span>

              <span className="alumniCtaRipples" aria-hidden>
                <AnimatePresence>
                  {ripples.map((ripple) => (
                    <motion.span
                      key={ripple.id}
                      className="alumniCtaRipple"
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
            </MotionLink>
          </div>
        </div>

        <motion.div style={{ opacity: carouselOpacity }}>
          <OrganizationCarousel organizations={ORGANIZATIONS} />

          <p className={disclaimer.alumniDisclaimer}>
            Disclaimer: &ldquo;The content of UCS/GSC recognized student
            organization websites is generated independently from Brown
            University. The statements, views, opinions, and information
            contained on the site are personal to those of the authors and
            student organization and do not necessarily reflect those of Brown
            University. The content on the site is not reviewed, approved, or
            endorsed by Brown University or its faculty or staff.&rdquo;
          </p>
        </motion.div>
      </div>
    </div>
  )
}
