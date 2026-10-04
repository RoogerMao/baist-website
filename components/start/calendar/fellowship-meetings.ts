import type { CalendarEvent } from "./calendar-types"
import { isPastEvent } from "./calendar-utils"

/** Sunday that starts the week of Meeting #1. */
const FIRST_WEEK = Date.UTC(2026, 9, 4)
const DAY = 86_400_000
const WEEK = 7 * DAY

interface MeetingSeries {
  title: string
  /** 0 = Sunday … 6 = Saturday. */
  weekday: number
  time: string
}

// AI Safety Fundamentals cohorts are intentionally omitted for now.
const SERIES: MeetingSeries[] = [
  { title: "Technical Safety #1", weekday: 1, time: "5 to 7 PM" },
  { title: "Governance", weekday: 3, time: "5 to 7 PM" },
  { title: "Technical Safety #2", weekday: 4, time: "5:30 to 7:30 PM" },
]

const MONTHS = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December",
]

function ordinal(n: number): string {
  const v = n % 100
  if (v >= 11 && v <= 13) return `${n}th`
  return `${n}${["th", "st", "nd", "rd"][n % 10] ?? "th"}`
}

/** Today's calendar date in campus time, as a UTC-midnight timestamp. */
function campusToday(now: Date): number {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    })
      .formatToParts(now)
      .map((p) => [p.type, Number(p.value)])
  )
  return Date.UTC(parts.year, parts.month - 1, parts.day)
}

/**
 * Fellowship meetings from Meeting #1 through the end of next week, derived
 * from the clock: this week's meetings are pinned, and older ones stay on the page as past events.
 */
export function fellowshipMeetings(now: Date): CalendarEvent[] {
  const today = campusToday(now)
  const thisWeek = Math.floor((today - FIRST_WEEK) / WEEK)
  const events: CalendarEvent[] = []

  for (let week = 0; week <= thisWeek + 1; week++) {
    for (const s of SERIES) {
      const day = new Date(FIRST_WEEK + week * WEEK + s.weekday * DAY)
      const event: CalendarEvent = {
        title: `${s.title} · Week ${week + 1}`,
        date: `${MONTHS[day.getUTCMonth()]} ${ordinal(day.getUTCDate())}, ${day.getUTCFullYear()}`,
        time: s.time,
        audience: "Fellows",
        topics: [],
      }
      if (week === thisWeek && !isPastEvent(event, now)) event.pinned = true
      events.push(event)
    }
  }
  return events
}
