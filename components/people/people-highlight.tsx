"use client"

import { useEffect } from "react"

const CARD_FLASH_CLASS = "personCardFlash"
const CARD_FLASH_MS = 2200
const TITLE_FLASH_CLASS = "sectionFlash"
const TITLE_FLASH_MS = 1800

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

      target.scrollIntoView({
        behavior: "smooth",
        block: title ? "start" : "center",
      })

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
