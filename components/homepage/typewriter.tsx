"use client"

import { useEffect, useRef, useState } from "react"

interface TypewriterProps {
  text: string
  /** ms per character. */
  typingSpeed?: number
  /** ms before typing starts. */
  startDelay?: number
}

/**
 * Types `text` out once on mount, then blinks the cursor a couple more times
 * before it fades away. Respects prefers-reduced-motion by showing the full
 * text immediately. Ported from a Framer TypewriterEffect component (which
 * cycles a word list forever) into a single "first load" reveal.
 */
export function Typewriter({
  text,
  typingSpeed = 45,
  startDelay = 300,
}: TypewriterProps) {
  const [displayed, setDisplayed] = useState("")
  const [done, setDone] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const [cursorVisible, setCursorVisible] = useState(true)
  const blinkCountRef = useRef(0)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayed(text)
      setDone(true)
      return
    }

    let charIndex = 0
    let timeout: ReturnType<typeof setTimeout>

    const typeNext = () => {
      charIndex += 1
      setDisplayed(text.slice(0, charIndex))
      if (charIndex < text.length) {
        timeout = setTimeout(typeNext, typingSpeed)
      } else {
        setDone(true)
      }
    }

    timeout = setTimeout(typeNext, startDelay)
    return () => clearTimeout(timeout)
  }, [text, typingSpeed, startDelay])

  useEffect(() => {
    const blink = setInterval(() => {
      setShowCursor((v) => !v)
      if (done) {
        blinkCountRef.current += 1
        if (blinkCountRef.current >= 4) {
          clearInterval(blink)
          setCursorVisible(false)
        }
      }
    }, 500)
    return () => clearInterval(blink)
  }, [done])

  return (
    <span aria-label={text}>
      <span aria-hidden="true">
        {displayed}
        <span
          style={{
            display: "inline-block",
            width: "0.06em",
            height: "0.85em",
            marginLeft: "0.02em",
            background: "currentColor",
            verticalAlign: "-0.05em",
            opacity: cursorVisible && showCursor ? 1 : 0,
            transition: "opacity 0.1s",
          }}
        />
      </span>
    </span>
  )
}
