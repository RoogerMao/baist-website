import type { OpenHoursDay } from "./open-hours"

/**
 * Facilitator open hours during the application window. Rendered as the Open
 * Hours table on the fellowships page, and also turned into General Body
 * events on the calendar (components/start/calendar/calendar-data.ts).
 */
export const openHours: OpenHoursDay[] = [
  {
    label: "Mon. 9/14",
    date: "September 14th, 2026",
    sessions: [
      {
        window: "1:30 to 2:30 PM",
        facilitators: [{ label: "Raen", name: "Raen Kao" }],
        location: "Rockefeller Room 131",
      },
    ],
  },
  {
    label: "Tues. 9/15",
    date: "September 15th, 2026",
    sessions: [
      {
        window: "2:00 to 3:00 PM",
        facilitators: [{ label: "Garrett", name: "Garrett Xu" }],
        location: "Rockefeller 133",
      },
    ],
  },
  {
    label: "Wed. 9/16",
    date: "September 16th, 2026",
    sessions: [
      {
        window: "1:00 to 2:00 PM",
        facilitators: [{ label: "Cam", name: "Camden Wright" }],
        location: "Rockefeller Study Room TBD",
      },
      {
        window: "4:30 to 5:30 PM",
        facilitators: [{ label: "Roger", name: "Roger Mao" }],
        location: "Rockefeller Study Room TBD",
      },
    ],
  },
  {
    label: "Thurs. 9/17",
    date: "September 17th, 2026",
    sessions: [
      {
        window: "3:00 to 4:00 PM",
        facilitators: [{ label: "Tyrone", name: "Tyrone Serapio" }],
        location: "Salomon 004",
      },
    ],
  },
  {
    label: "Fri. 9/18",
    date: "September 18th, 2026",
    sessions: [
      {
        window: "4:30 to 5:30 PM",
        facilitators: [
          { label: "Roger", name: "Roger Mao" },
          { label: "Garrett", name: "Garrett Xu" },
        ],
        location: "Page Robinson 501",
      },
    ],
  },
]
