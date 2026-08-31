"use client"

import { AnimatePresence } from "motion/react"
import { Stack, Text } from "@mantine/core"
import { IconArrowUp } from "@tabler/icons-react"
import { SplitText } from "./split-text"
import { usePageNav } from "./animation-manager"

export function Alumni() {
  const { view, goUp } = usePageNav()
  const active = view === "bottom"

  return (
    <Stack gap="xl" className="pageMain communityPage">
      <button type="button" className="pageNavButton" onClick={goUp}>
        <IconArrowUp size={18} stroke={1.5} />
        Our Community
      </button>

      <Stack gap="sm" className="communityBody">
        <h1 className="hero">
          <AnimatePresence>
            {active && (
              <SplitText key="alumni-heading" delay={0.35}>
                Our Community
              </SplitText>
            )}
          </AnimatePresence>
        </h1>
        <Text c="dimmed" className="subheading" style={{ maxWidth: "40rem" }}>
          Placeholder text for the page beneath. This is where the community
          section will live — people, stories, and everything that happens
          between the fellowships and the events.
        </Text>
      </Stack>
    </Stack>
  )
}
