"use client"

import { useEffect } from "react"

const FLASH_CLASS = "personCardFlash"
const FLASH_MS = 2200

/**
 * Watches the URL hash (e.g. `/people#person-roger-mao`) and briefly flashes the
 * matching person card with the accent colour. Rendered once on the People page.
 */
export function PeopleHighlight() {
  useEffect(() => {
    function flashFromHash() {
      const id = window.location.hash.slice(1)
      if (!id) return
      const card = document.getElementById(id)
      if (!card) return

      card.scrollIntoView({ behavior: "smooth", block: "center" })

      // restart the animation even if it is already running
      card.classList.remove(FLASH_CLASS)
      void card.offsetWidth
      card.classList.add(FLASH_CLASS)
      window.setTimeout(() => card.classList.remove(FLASH_CLASS), FLASH_MS)
    }

    flashFromHash()
    window.addEventListener("hashchange", flashFromHash)
    return () => window.removeEventListener("hashchange", flashFromHash)
  }, [])

  return null
}
