"use client"

import { useCallback, useRef, useState } from "react"
import { Tooltip, UnstyledButton } from "@mantine/core"

import classes from "./copy-email.module.css"

/** Copy `text` to the clipboard, falling back to a hidden textarea + execCommand. */
async function copyText(text: string) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // fall through to the legacy path
  }

  try {
    const area = document.createElement("textarea")
    area.value = text
    area.style.position = "fixed"
    area.style.opacity = "0"
    document.body.appendChild(area)
    area.select()
    const ok = document.execCommand("copy")
    document.body.removeChild(area)
    return ok
  } catch {
    return false
  }
}

/**
 * Renders an email address in the accent colour. Clicking (or pressing
 * Enter/Space) copies it to the clipboard and briefly swaps the tooltip label
 * to a confirmation.
 */
export function CopyEmail({
  address,
  className,
}: {
  address: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const handleCopy = useCallback(async () => {
    const ok = await copyText(address)
    if (!ok) return
    setCopied(true)
    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => setCopied(false), 1500)
  }, [address])

  return (
    <Tooltip
      label={copied ? "Copied!" : "Click to copy"}
      withArrow
      events={{ hover: true, focus: true, touch: true }}
    >
      <UnstyledButton
        component="span"
        role="button"
        tabIndex={0}
        onClick={handleCopy}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            handleCopy()
          }
        }}
        className={
          className ? `${classes.copyEmail} ${className}` : classes.copyEmail
        }
      >
        {address}
      </UnstyledButton>
    </Tooltip>
  )
}
