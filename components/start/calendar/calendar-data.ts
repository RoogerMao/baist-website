import { openHours } from "@/components/start/fellowships/open-hours-data"
import type { CalendarEvent } from "./calendar-types"

/** "Roger", "Roger and Garrett", "Raen, Roger, and Garrett" */
function joinNames(names: string[]): string {
  if (names.length <= 2) return names.join(" and ")
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`
}

/** One General Body event per open hours session on the fellowships page. */
const openHoursEvents: CalendarEvent[] = openHours.flatMap((day) =>
  day.sessions.map((session) => {
    const names = joinNames(session.facilitators.map((f) => f.label))
    return {
      title: `${names}'s Open Hours`,
      date: day.date,
      time: session.window,
      location: session.location,
      audience: "General Body" as const,
      topics: ["Club Information", "Fellowship Applications"],
    }
  })
)

export const events: CalendarEvent[] = [
  {
    title: "Club Fair Table",
    description:
      "Drop by our table Club Fair! We're excited to meet you, chat about the club, thoughts about AI, or hang out. We have a surprise activities planned, and a chance to win gift cards to local coffee and boba shops!",
    date: "September 10th, 2026",
    time: "5 to 8:30 PM",
    location: "Main Green",
    audience: "General Body",
    topics: ["Club Information", "Fellowship Applications"],
  },
  {
    title: "AI Safety News Flash",
    date: "September 29th, 2026",
    time: "6 to 7 PM",
    location: "The Underground",
    audience: "General Body",
    topics: [],
  },
  {
    title: "Fellowship Kick-Off",
    description:
      "Garrett will give a short presentation about HuggingFace, we'll provide food, and there will be time for you to meet the fellows in all of our cohorts this semester!",
    date: "October 1st, 2026",
    time: "6:30 to 8:30 PM",
    location: "The Underground",
    audience: "Fellows",
    topics: [],
  },
  ...openHoursEvents,
]
