"use client"

import { IconArrowDown } from "@tabler/icons-react"
import { motion, useMotionValue, useTransform } from "motion/react"
import { LandingLink } from "./landing_link"
import { useHomeScreens } from "./animation-manager"

export function Landing() {
  const fallback = useMotionValue(0)
  const screens = useHomeScreens() ?? fallback
  // Only visible while the landing is fully in view; fades the moment you scroll.
  const cueOpacity = useTransform(screens, [0, 0.12], [1, 0])

  return (
    <div className="landingPage homeSection">
      <div className="homeContent">
        <h1 className="hero">Explore AI&nbsp;Safety.</h1>

        <p className="subheading">
          We&apos;re a community of ambitious builders and thinkers set on
          tackling some of the most pressing problems in technology, AI, and
          policy.
        </p>

        <div className="landingLinks">
          <LandingLink
            href="/people"
            iconSrc="/landing/mentoring.svg"
            title="1:1 Mentorship"
            description="Meet with any member of our executive board, whether you're an interested student, fellow, or club member."
          />
          <LandingLink
            href="/start/events"
            iconSrc="/landing/events.svg"
            title="Club Events"
            description="High-profile speakers, application workshops, and club trips."
          />
          <LandingLink
            href="/start/fellowships"
            iconSrc="/landing/fellowships.svg"
            title="Research and Governance Fellowships"
            description="Build real-world skills while learning the arguments for and against AI safety. Applications due Friday, September 18th."
            highlight
          />
        </div>
      </div>

      <div className="cueBand">
        <motion.p className="cueText" style={{ opacity: cueOpacity }}>
          See where you could go
          <IconArrowDown stroke={1.5} />
        </motion.p>
      </div>
    </div>
  )
}
