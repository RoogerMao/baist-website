import type { CalendarEvent, EventAudience } from "./calendar-types"

/**
 * Parses a human-readable event date like "September 10th, 2026" into a Date.
 * Strips ordinal suffixes (st/nd/rd/th) so `Date` can read it. Returns `null`
 * when the string can't be parsed.
 */
export function parseEventDate(date: string): Date | null {
  const cleaned = date.replace(/(\d+)(st|nd|rd|th)/gi, "$1")
  const ms = Date.parse(cleaned)
  return Number.isNaN(ms) ? null : new Date(ms)
}

/** Start of the local day, used as the boundary between past and upcoming. */
function startOfToday(now: Date): number {
  return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
}

/** True when the event's date is before today. Unparseable dates count as upcoming. */
export function isPastEvent(event: CalendarEvent, now: Date = new Date()): boolean {
  const parsed = parseEventDate(event.date)
  return parsed ? parsed.getTime() < startOfToday(now) : false
}

/** Stable DOM id for an event, so preview cards can scroll to the full card. */
export function eventId(event: CalendarEvent): string {
  return `event-${`${event.date}-${event.title}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}`
}

/**
 * Splits events into upcoming (today or later, soonest first) and past
 * (before today, most recent first).
 */
export function splitEvents(events: CalendarEvent[], now: Date = new Date()) {
  const upcoming: CalendarEvent[] = []
  const past: CalendarEvent[] = []

  for (const event of events) {
    ;(isPastEvent(event, now) ? past : upcoming).push(event)
  }

  const byDate = (dir: 1 | -1) => (a: CalendarEvent, b: CalendarEvent) => {
    const at = parseEventDate(a.date)?.getTime() ?? 0
    const bt = parseEventDate(b.date)?.getTime() ?? 0
    return (at - bt) * dir
  }

  upcoming.sort(byDate(1))
  past.sort(byDate(-1))

  return { upcoming, past }
}

/**
 * Events to show in a Pinned board column for a given audience:
 *  1. every pinned event for that audience, or
 *  2. the soonest upcoming event for that audience, or
 *  3. nothing (caller shows a placeholder).
 */
export function pinnedEventsFor(
  events: CalendarEvent[],
  audience: EventAudience,
  now: Date = new Date()
): CalendarEvent[] {
  const matching = events.filter((e) => e.audience === audience)

  const pinned = matching.filter((e) => e.pinned)
  if (pinned.length > 0) return pinned

  const soonest = matching
    .filter((e) => !isPastEvent(e, now))
    .sort((a, b) => {
      const at = parseEventDate(a.date)?.getTime() ?? Infinity
      const bt = parseEventDate(b.date)?.getTime() ?? Infinity
      return at - bt
    })

  return soonest.length > 0 ? [soonest[0]] : []
}
