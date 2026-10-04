"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Pagination, Text, Title } from "@mantine/core"
import type { CalendarEvent } from "./calendar-types"
import { splitEvents } from "./calendar-utils"
import { EventGrid } from "./event-grid"
import { PinnedSection } from "./pinned-section"

const PAST_PAGE_SIZE = 12

export function CalendarBoard({
  events,
  now,
}: {
  events: CalendarEvent[]
  /** Render time from the server, so hydration sees the same split. */
  now: number
}) {
  const { upcoming, past } = useMemo(() => {
    const split = splitEvents(events, new Date(now))
    // Pinned events are already featured at the top of the page.
    return { ...split, upcoming: split.upcoming.filter((e) => !e.pinned) }
  }, [events, now])
  const [pastPage, setPastPage] = useState(1)
  const pastPages = Math.max(1, Math.ceil(past.length / PAST_PAGE_SIZE))
  const pastVisible = past.slice(
    (Math.min(pastPage, pastPages) - 1) * PAST_PAGE_SIZE,
    Math.min(pastPage, pastPages) * PAST_PAGE_SIZE
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
          <>
            <EventGrid events={pastVisible} highlightedId={highlightedId} />
            {pastPages > 1 && (
              <Pagination
                total={pastPages}
                value={Math.min(pastPage, pastPages)}
                onChange={setPastPage}
                mt="xl"
                style={{ display: "flex", justifyContent: "center" }}
              />
            )}
          </>
        ) : (
          <Text c="dimmed" ta="center">
            No past events yet.
          </Text>
        )}
      </section>
    </>
  )
}
