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

/** Event times are written in campus time, regardless of where the code runs. */
const EVENT_TIME_ZONE = "America/New_York"

const zoneFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: EVENT_TIME_ZONE,
  hourCycle: "h23",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
})

/** Converts a wall-clock time in EVENT_TIME_ZONE to a UTC timestamp. */
function zonedTime(year: number, month: number, day: number, hour: number, minute: number): number {
  const guess = Date.UTC(year, month, day, hour, minute)
  const parts = Object.fromEntries(
    zoneFormat.formatToParts(guess).map((p) => [p.type, Number(p.value)])
  )
  const asZone = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute)
  return guess - (asZone - guess)
}

/**
 * When the event ends: the last time in `time` ("1:30 to 2:30 PM" → 2:30 PM),
 * or the end of the day when there's no readable time. `null` if the date
 * can't be parsed.
 */
function eventEnd(event: CalendarEvent): number | null {
  const date = parseEventDate(event.date)
  if (!date) return null

  let hour = 24
  let minute = 0
  const end = event.time?.split(/\s*(?:to|–|-)\s*/i).pop()
  const match = end?.match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/i)
  if (match) {
    hour = (Number(match[1]) % 12) + (match[3].toUpperCase() === "PM" ? 12 : 0)
    minute = Number(match[2] ?? 0)
  }

  return zonedTime(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute)
}

/** True once the event has ended. Unparseable dates count as upcoming. */
export function isPastEvent(event: CalendarEvent, now: Date = new Date()): boolean {
  const end = eventEnd(event)
  return end !== null && end <= now.getTime()
}

/** Stable DOM id for an event, so preview cards can scroll to the full card. */
export function eventId(event: CalendarEvent): string {
  return `event-${`${event.date}-${event.title}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}`
}

/**
 * Splits events into upcoming (not yet ended, soonest first) and past
 * (ended, most recent first).
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
