"use client"

import { useEffect } from "react"

const CARD_FLASH_CLASS = "personCardFlash"
const CARD_FLASH_MS = 2200
// Shared with the section-nav drawer (components/people/section-nav.tsx), so
// both routes to a heading flash identically. Matches its 1.8s animation.
const TITLE_FLASH_CLASS = "sectionFlash"
const TITLE_FLASH_MS = 1800

/**
 * Watches the URL hash and briefly flashes what it points at with the accent
 * colour. Two shapes of target: a person card (`/people#person-roger-mao`),
 * which flashes its whole outline, and a section (`/people#executive-board`),
 * where flashing the full-width block would be a wall of colour — so the
 * section's heading text is coloured instead. Rendered once on the People page.
 */
export function PeopleHighlight() {
  useEffect(() => {
    function flashFromHash() {
      const id = window.location.hash.slice(1)
      if (!id) return
      const target = document.getElementById(id)
      if (!target) return

      const title = target.querySelector<HTMLElement>("[data-section-title]")
      const flashed = title ?? target
      const flashClass = title ? TITLE_FLASH_CLASS : CARD_FLASH_CLASS
      const flashMs = title ? TITLE_FLASH_MS : CARD_FLASH_MS

      // Sections are scrolled to their top (their scroll-mt clears the fixed
      // header); a card is centred, since it's a single element in a grid.
      target.scrollIntoView({
        behavior: "smooth",
        block: title ? "start" : "center",
      })

      // restart the animation even if it is already running
      flashed.classList.remove(flashClass)
      void flashed.offsetWidth
      flashed.classList.add(flashClass)
      window.setTimeout(() => flashed.classList.remove(flashClass), flashMs)
    }

    flashFromHash()
    window.addEventListener("hashchange", flashFromHash)
    return () => window.removeEventListener("hashchange", flashFromHash)
  }, [])

  return null
}
