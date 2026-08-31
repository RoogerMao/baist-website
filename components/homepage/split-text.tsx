"use client"

import { motion, type Variants } from "motion/react"

export interface SplitTextProps {
  children: string
  by?: "word" | "char"
  className?: string
  stagger?: number
  delay?: number
}

const container: Variants = {
  in: { transition: { staggerChildren: 0.055 } },
  out: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
}

const unit: Variants = {
  in: { y: "0%", transition: { type: "spring", stiffness: 320, damping: 32 } },
  out: { y: "120%", transition: { duration: 0.35, ease: "easeIn" } },
}

export function SplitText({
  children,
  by = "word",
  className,
  stagger,
  delay = 0,
}: SplitTextProps) {
  const units =
    by === "word" ? children.split(/(\s+)/) : Array.from(children)

  return (
    <motion.span
      className={className}
      style={{ display: "inline-block" }}
      variants={container}
      initial="out"
      animate="in"
      exit="out"
      transition={{
        staggerChildren: stagger,
        delayChildren: delay,
      }}
      aria-label={children}
    >
      {units.map((u, i) =>
        /^\s+$/.test(u) ? (
          <span key={i}>{" "}</span>
        ) : (
          <span
            key={i}
            aria-hidden
            style={{
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "top",
            }}
          >
            <motion.span
              variants={unit}
              style={{ display: "inline-block", willChange: "transform" }}
            >
              {u}
            </motion.span>
          </span>
        ),
      )}
    </motion.span>
  )
}
