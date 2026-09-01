"use client"

import type { ReactNode } from "react"
import { motion, useTransform, type MotionValue } from "motion/react"

/** Fraction of the reveal progress each word takes to fade in. */
const WORD_WINDOW = 0.16
/** Pause inserted where the reveal moves from one segment group to the next. */
const GROUP_GAP = 0.12
const HIDDEN_OPACITY = 0.1

/** One word whose opacity is driven by a slice of the scroll progress. */
export function RevealWord({
  children,
  progress,
  range,
}: {
  children: ReactNode
  progress: MotionValue<number>
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [HIDDEN_OPACITY, 1])
  return <motion.span style={{ opacity }}>{children}</motion.span>
}

/**
 * Given the words in the order they should reveal — each tagged with its
 * segment's `revealOrder` — returns a [start, end] progress slice per word.
 * Words reveal left-to-right within a group; a group only starts once the
 * previous group has fully finished (plus a short gap).
 */
function buildRanges(
  order: number[],
): [number, number][] {
  const n = order.length
  if (n === 0) return []
  if (n === 1) return [[0, 1]]

  const isGroupBreak = order.map(
    (value, index) => index > 0 && value !== order[index - 1],
  )
  const breakCount = isGroupBreak.filter(Boolean).length
  // At a group break the cursor jumps a full word window (so the previous
  // group's last word has finished) plus a gap; every other step is uniform.
  const breakAdvance = WORD_WINDOW + GROUP_GAP
  const step =
    n - 1 - breakCount > 0
      ? Math.max(
          0,
          1 - WORD_WINDOW - breakCount * breakAdvance,
        ) /
        (n - 1 - breakCount)
      : 0

  let cursor = 0
  return order.map((_, index) => {
    if (index > 0) cursor += isGroupBreak[index] ? breakAdvance : step
    return [cursor, Math.min(1, cursor + WORD_WINDOW)]
  })
}

export interface RevealSegment {
  text: string
  component?: "h1" | "p"
  className?: string
  /** Lower reveals first on the way in — and fades last on the way out. */
  revealOrder: number
  /** Wrap words from this index onward in a `.heroUnderline` span. */
  underlineFrom?: number
  /** Punctuation rendered after the underline span, outside it. */
  trailing?: string
}

export interface ScrollRevealGroupProps {
  segments: RevealSegment[]
  /** 0 → all words hidden, 1 → all revealed. Reverses on scroll-up. */
  progress: MotionValue<number>
  /**
   * "forward" (default): word at reveal-position 0 is the first reading word, so
   * as `progress` falls the last word goes first. "reverse": position 0 is the
   * last reading word, so a falling `progress` clears words in reading order.
   */
  wordOrder?: "forward" | "reverse"
}

/**
 * Reveals several blocks of text word by word as `progress` moves, ordering the
 * reveal across all of them by each segment's `revealOrder` (so e.g. the
 * subheading finishes before the hero starts). Rendered in DOM order.
 * See motion.dev/examples/react-text-scroll-word-reveal.
 */
export function ScrollRevealGroup({
  segments,
  progress,
  wordOrder = "forward",
}: ScrollRevealGroupProps) {
  const wordsBySegment = segments.map((segment) => segment.text.split(" "))
  const wordSign = wordOrder === "reverse" ? -1 : 1

  // Order every word: segments with a lower revealOrder reveal first; within a
  // segment words run left-to-right ("forward") or right-to-left ("reverse").
  // Then hand the ordered revealOrder sequence to buildRanges so each group
  // waits for the previous one.
  const ordered = segments
    .flatMap((_, segmentIndex) =>
      wordsBySegment[segmentIndex].map((_, wordIndex) => ({
        segmentIndex,
        wordIndex,
      })),
    )
    .sort(
      (a, b) =>
        segments[a.segmentIndex].revealOrder -
          segments[b.segmentIndex].revealOrder ||
        wordSign * (a.wordIndex - b.wordIndex),
    )

  const ranges = buildRanges(
    ordered.map((entry) => segments[entry.segmentIndex].revealOrder),
  )
  const rangeByWord = new Map<string, [number, number]>()
  ordered.forEach((entry, position) => {
    rangeByWord.set(
      `${entry.segmentIndex}-${entry.wordIndex}`,
      ranges[position],
    )
  })

  return (
    <>
      {segments.map((segment, segmentIndex) => {
        const Component = segment.component === "h1" ? motion.h1 : motion.p
        const words = wordsBySegment[segmentIndex]
        const underlineFrom = segment.underlineFrom ?? words.length

        const renderWord = (word: string, wordIndex: number) => (
          <RevealWord
            key={wordIndex}
            progress={progress}
            range={
              rangeByWord.get(`${segmentIndex}-${wordIndex}`) ?? [0, 1]
            }
          >
            {word}
            {wordIndex < words.length - 1 ? " " : ""}
          </RevealWord>
        )

        return (
          <Component key={segmentIndex} className={segment.className}>
            {words.slice(0, underlineFrom).map((word, index) =>
              renderWord(word, index),
            )}
            {underlineFrom < words.length && (
              <span className="heroUnderline">
                {words
                  .slice(underlineFrom)
                  .map((word, index) => renderWord(word, underlineFrom + index))}
              </span>
            )}
            {segment.trailing}
          </Component>
        )
      })}
    </>
  )
}
