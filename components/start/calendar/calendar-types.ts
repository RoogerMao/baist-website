/** Who an event is open to. */
export type EventAudience = "General Body" | "Fellows" | "Members"

/**
 * Event topics, grouped by colour family. "Club Information" uses the site's
 * primary (blue) accent; the fellowship-related topics share a secondary
 * (violet) accent.
 */
export type EventTopic =
  | "Club Information"
  | "Fellowship Applications"
  | "Technical Safety Research Fellowship"
  | "Governance Fellowship"
  | "AI Safety Fundamentals Fellowship"

/** Mantine colour used to render each topic's chip. */
export const TOPIC_COLORS: Record<EventTopic, string> = {
  "Club Information": "blue",
  "Fellowship Applications": "violet",
  "Technical Safety Research Fellowship": "violet",
  "Governance Fellowship": "violet",
  "AI Safety Fundamentals Fellowship": "violet",
}

export interface CalendarEvent {
  /** Event name. */
  title: string
  /** Longer prose blurb — rendered as Markdown. */
  description: string
  /** Human-readable date, e.g. "September 10th, 2026". */
  date: string
  /** Who may attend. */
  audience: EventAudience
  /** Zero or more topic tags. */
  topics: EventTopic[]
  /** Human-readable time, e.g. "5 to 8:30 PM". Only shown for General Body events. */
  time?: string
  /** Where the event is held. Only shown for General Body events. */
  location?: string
  /** When true, the event is surfaced in the "Pinned" board at the top. */
  pinned?: boolean
}
