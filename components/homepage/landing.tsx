"use client"

import { motion, useMotionValue, useTransform } from "motion/react"
import { LandingLink } from "./landing_link"
import { ScrollCue } from "./scroll-cue"
import { Typewriter } from "./typewriter"
import { useHome } from "./animation-manager"

import classes from "./landing.module.css"

/**
 * Fade-out order leaving the landing (scrolling down): hero, then subheading,
 * then the links — each range sits inside the manager's landing-exit window
 * (fadeProgress 0 -> 0.45). Scrolling back up reverses it automatically since
 * these are just plain functions of fadeProgress.
 */
const HERO_RANGE: [number, number] = [0, 0.15]
const SUBHEADING_RANGE: [number, number] = [0.13, 0.3]
const LINKS_RANGE: [number, number] = [0.28, 0.45]

export function Landing() {
  const home = useHome()
  const fallback = useMotionValue(0)
  const fadeProgress = home?.fadeProgress ?? fallback

  const heroOpacity = useTransform(fadeProgress, HERO_RANGE, [1, 0])
  const subheadingOpacity = useTransform(fadeProgress, SUBHEADING_RANGE, [1, 0])
  const linksOpacity = useTransform(fadeProgress, LINKS_RANGE, [1, 0])

  const cueInline = home?.cueInline ?? false

  return (
    <div className="landingPage homeSection" data-cue-inline={cueInline || undefined}>
      <div className="homeContent">
        <motion.h1 className="hero" style={{ opacity: heroOpacity }}>
          <span className="heroUnderline">
            <Typewriter text="Explore AI Safety." />
          </span>
        </motion.h1>
        <motion.p className="subheading" style={{ opacity: subheadingOpacity }}>
          We're a community of ambitious builders and thinkers set on
          preventing catastrophic outcomes from transformative AI.
        </motion.p>

        <motion.div className={classes.landingLinks} style={{ opacity: linksOpacity }}>
          <LandingLink
            href="/start/fellowships"
            iconSrc="/landing/fellowships.svg"
            title="Research and Governance Fellowships"
            description="We will teach you real-world skills, the arguments for, and the arguments against AI safety."
            emphasis="Applications due Friday, September 18th."
            highlight
          />
          <LandingLink
            href="/start/calendar"
            iconSrc="/landing/events.svg"
            title="Club Events"
            description="Speakers, application workshops, club trips, and more."
          />
          <LandingLink
            href="/people"
            iconSrc="/landing/mentoring.svg"
            title="1:1 Mentorship"
            description="Meet with any member of our executive board, whether you're an interested student, fellow, or club member."
            highlight
          />
        </motion.div>

        {/* Stand-in for the pinned cue in animation-manager.tsx, used whenever
            this content is taller than the viewport: pinned to the bottom the
            cue would cover the links, so it flows after them and scrolls with
            them instead. The manager renders exactly one of the two. */}
        {cueInline && (
          <div className="homeCueInline">
            <ScrollCue
              direction="down"
              label="See where you could go"
              opacity={linksOpacity}
              onActivate={() => home?.scrollToAlumni()}
            />
          </div>
        )}
      </div>
    </div>
  )
}
