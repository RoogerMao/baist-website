import type { Metadata } from "next"
import { Title } from "@mantine/core"
import { CalendarBoard, events } from "@/components/start/calendar"

export const metadata: Metadata = {
  title: "Calendar — Brown AI Safety Team",
}

// Which events are upcoming depends on the clock, so re-render every 5 minutes
// instead of freezing the split at build time.
export const revalidate = 300

export default function CalendarPage() {
  const now = Date.now()

  return (
    <main className="w-full px-[var(--page-padding-inline)] pb-16 pt-[calc(var(--header-height)+2rem)]">
      <Title order={1} ta="center" mb="xl">
        Featured Events
      </Title>

      <CalendarBoard events={events} now={now} />
    </main>
  )
}
