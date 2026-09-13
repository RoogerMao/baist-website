import { Fragment } from "react"
import Link from "next/link"
import { personCardId } from "@/components/people/people-ids"
import { FellowshipCard } from "./fellowship-card"

import classes from "./open-hours.module.css"

export interface OpenHourSession {
  /** Time window, e.g. "4:00 – 5:00 PM". */
  window: string
  facilitators: OpenHoursFacilitator[]
  location: string
}

export interface OpenHoursFacilitator {
  /** Name as shown on the card, e.g. "Cam". */
  label: string
  /** Full name matching their People page card, e.g. "Camden Wright". */
  name: string
}

export interface OpenHoursDay {
  /** Column heading, e.g. "Mon. 9/14". */
  label: string
  /** Full date for the calendar event, e.g. "September 14th, 2026". */
  date: string
  sessions: OpenHourSession[]
}

export interface OpenHoursProps {
  days: OpenHoursDay[]
}

export function OpenHours({ days }: OpenHoursProps) {
  return (
    <FellowshipCard title="Open Hours">
      <div className={classes.openHoursScroll}>
        <table className={classes.openHoursTable}>
          <thead>
            <tr>
              {days.map((day) => (
                <th key={day.label} scope="col" className={classes.openHoursDay}>
                  {day.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {days.map((day) => (
                <td key={day.label} className={classes.openHoursCell}>
                  {day.sessions.map((session, i) => (
                    <div key={i} className={classes.openHoursSession}>
                      <p className={classes.openHoursWindow}>{session.window}</p>
                      <p>
                        {session.facilitators.map((f, j) => (
                          <Fragment key={f.name}>
                            {j > 0 && ", "}
                            <Link
                              href={`/people#${personCardId(f.name)}`}
                              className={classes.openHoursFacilitator}
                            >
                              {f.label}
                            </Link>
                          </Fragment>
                        ))}
                      </p>
                      <p className={classes.openHoursLocation}>
                        {session.location}
                      </p>
                    </div>
                  ))}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </FellowshipCard>
  )
}
