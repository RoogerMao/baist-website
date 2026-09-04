import type { Metadata } from "next"
import { Title } from "@mantine/core"
import { CalendarBoard, events } from "@/components/start/calendar"

export const metadata: Metadata = {
  title: "Calendar — Brown AI Safety Team",
}

export default function CalendarPage() {
  return (
    <main className="w-full px-[var(--page-padding-inline)] pb-16 pt-[calc(var(--header-height)+2rem)]">
      <Title order={1} ta="center" mb="xl">
        Featured Events
      </Title>

      <CalendarBoard events={events} />
    </main>
  )
}
