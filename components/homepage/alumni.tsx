"use client"

import { IconArrowUp } from "@tabler/icons-react"
import { motion, useMotionValue, useTransform } from "motion/react"
import { AlumniCarousel } from "./alumni-carousel"
import { useHomeScreens } from "./animation-manager"

export function Alumni() {
  const fallback = useMotionValue(1)
  const screens = useHomeScreens() ?? fallback
  // Appears as the alumni layer settles in.
  const cueOpacity = useTransform(screens, [1.45, 1.75], [0, 1])

  return (
    <div className="alumniPage homeSection">
      <motion.p
        className="cueText cueText--top"
        style={{ opacity: cueOpacity }}
      >
        <IconArrowUp stroke={1.5} />
        Our Community
      </motion.p>

      <div className="homeContent">
        <h1 className="hero">
          You don&apos;t have to sacrifice your career to do good.
        </h1>

        <p className="subheading">
          Our alumni have done both. See their profiles below. 
        </p>

        <AlumniCarousel />
      </div>
    </div>
  )
}
