"use client"

import { useState } from "react"
import Link from "next/link"
import { IconArrowUpRight } from "@tabler/icons-react"
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "motion/react"
import { AlumniCarousel } from "./alumni-carousel"
import { ALUMNI } from "./alumni-data"
import { ScrollCue } from "./scroll-cue"
import { useHome } from "./animation-manager"

const MotionLink = motion.create(Link)

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

  return (
    <div
      className="alumniPage homeSection"
      data-focused={focused || undefined}
    >
      <ScrollCue
        direction="up"
        label="BAIST Today"
        opacity={cueOpacity}
        onActivate={() => home?.scrollToTop()}
        className="cueText--top"
      />

      <div className="homeContent">
        <div className="alumniIntro">
          <motion.h1 className="hero" style={{ opacity: heroOpacity }}>
            We want to build our careers{" "}
            <span className="heroUnderline">
              while preparing the world for future, more advanced models
            </span>
            .
          </motion.h1>

          <motion.p className="subheading" style={{ opacity: subheadingOpacity }}>
            Our alumni have done both.
          </motion.p>

          <MotionLink
            href="/start"
            className="alumniCta"
            style={{ opacity: ctaOpacity }}
          >
            <span>Learn how to join</span>
            <IconArrowUpRight size={22} stroke={2} aria-hidden />
          </MotionLink>
        </div>

        <motion.div style={{ opacity: carouselOpacity }}>
          <AlumniCarousel profiles={ALUMNI} />
        </motion.div>
      </div>
    </div>
  )
}
