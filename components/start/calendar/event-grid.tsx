import { EventCard } from "./event-card"
import { eventId } from "./calendar-utils"
import type { CalendarEvent } from "./calendar-types"

/**
 * Centered, wrapping grid of event cards — up to 3 per row on wide screens,
 * collapsing to 2 / 1. Rows stay centred no matter how many cards there are.
 */
export function EventGrid({
  events,
  highlightedId,
}: {
  events: CalendarEvent[]
  /** id of the card to briefly highlight (set by a Pinned preview click). */
  highlightedId?: string | null
}) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {events.map((event) => {
        const id = eventId(event)
        return (
          <div key={id} className="w-full sm:w-[360px] lg:w-[380px]">
            <EventCard event={event} id={id} highlighted={id === highlightedId} />
          </div>
        )
      })}
    </div>
  )
}
