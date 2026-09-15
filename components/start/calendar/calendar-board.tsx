"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Text, Title } from "@mantine/core"
import type { CalendarEvent } from "./calendar-types"
import { splitEvents } from "./calendar-utils"
import { EventGrid } from "./event-grid"
import { PinnedSection } from "./pinned-section"

export function CalendarBoard({
  events,
  now,
}: {
  events: CalendarEvent[]
  /** Render time from the server, so hydration sees the same split. */
  now: number
}) {
  const { upcoming, past } = useMemo(
    () => splitEvents(events, new Date(now)),
    [events, now]
  )
  const [highlightedId, setHighlightedId] = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const handleSelect = useCallback((id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "center" })
    setHighlightedId(id)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setHighlightedId(null), 2200)
  }, [])

  useEffect(() => () => clearTimeout(timer.current), [])

  return (
    <>
      <PinnedSection events={events} now={now} onSelect={handleSelect} />

      <section className="mb-12">
        <Title order={2} ta="center" mb="md">
          Upcoming Events
        </Title>
        {upcoming.length > 0 ? (
          <EventGrid events={upcoming} highlightedId={highlightedId} />
        ) : (
          <Text c="dimmed" ta="center">
            No upcoming events right now — check back soon.
          </Text>
        )}
      </section>

      <section>
        <Title order={2} ta="center" mb="md">
          Past Events
        </Title>
        {past.length > 0 ? (
          <EventGrid events={past} highlightedId={highlightedId} />
        ) : (
          <Text c="dimmed" ta="center">
            No past events yet.
          </Text>
        )}
      </section>
    </>
  )
}
