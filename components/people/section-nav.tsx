"use client"

import { Drawer } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"

import classes from "./section-nav.module.css"
// The flashed element is people-section.tsx's heading, so the animation
// lives with that component; this file only needs the class name.
import sectionStyles from "./people-section.module.css"

export interface SectionLink {
  /** id of the target <section> on the page */
  id: string
  label: string
}

/** svgrepo.com/svg/532192/list */
function ListIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden focusable="false">
      <path
        d="M8 6h12M8 12h12M8 18h12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="4" cy="6" r="1.4" fill="currentColor" />
      <circle cx="4" cy="12" r="1.4" fill="currentColor" />
      <circle cx="4" cy="18" r="1.4" fill="currentColor" />
    </svg>
  )
}

const VISIBLE_TOP = 96

export function SectionNav({ sections }: { sections: SectionLink[] }) {
  const [opened, { open, close }] = useDisclosure(false)

  function goToSection(id: string) {
    const section = document.getElementById(id)
    const title =
      section?.querySelector<HTMLElement>("[data-section-title]") ?? section
    if (!title) return

    const { top } = title.getBoundingClientRect()
    const alreadyVisible = top >= VISIBLE_TOP && top <= window.innerHeight * 0.75
    if (!alreadyVisible) {
      title.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    // (re)start the highlight even if it's already running
    title.classList.remove(sectionStyles.sectionFlash)
    void title.offsetWidth
    title.classList.add(sectionStyles.sectionFlash)
    window.setTimeout(() => title.classList.remove(sectionStyles.sectionFlash), 1800)

    close()
  }

  return (
    <>
      <button
        type="button"
        className={classes.sectionNavToggle}
        aria-label="Open section navigation"
        onClick={open}
      >
        <ListIcon />
      </button>

      <Drawer
        opened={opened}
        onClose={close}
        position="left"
        size="xs"
        title="Sections"
        // sit below the fixed header rather than over it
        styles={{
          inner: {
            top: "var(--header-height)",
            bottom: 0,
            height: "auto",
          },
          overlay: { top: "var(--header-height)" },
          content: { maxHeight: "100%" },
          // body itself has no horizontal padding so the hover fill on each
          // .sectionNavLink can run flush to both edges of the drawer; the
          // links replace that padding with their own.
          body: { padding: 0 },
        }}
      >
        <nav>
          <ul className={classes.sectionNavList}>
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  type="button"
                  className={classes.sectionNavLink}
                  onClick={() => goToSection(section.id)}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </Drawer>
    </>
  )
}
