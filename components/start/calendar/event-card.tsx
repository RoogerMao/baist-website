import { Group, Paper, Stack, Text, Title } from "@mantine/core"
import { TOPIC_COLORS, type CalendarEvent } from "./calendar-types"
import { Markdown } from "./markdown"
import { Pill } from "./pill"

/** All audience chips share one accent colour. */
const AUDIENCE_COLOR = "yellow"

export function EventCard({
  event,
  id,
  highlighted,
}: {
  event: CalendarEvent
  /** DOM id, so preview cards can scroll here. */
  id?: string
  /** Briefly outline the card after a preview card links to it. */
  highlighted?: boolean
}) {
  const { title, description, date, audience, topics, time, location } = event

  // Time and location are only surfaced for General Body events.
  const timeLocation =
    audience === "General Body"
      ? [time, location].filter(Boolean).join(" · ")
      : ""

  return (
    <Paper
      id={id}
      withBorder
      radius="md"
      p="lg"
      className={
        highlighted
          ? "eventCard eventCardHighlight h-full scroll-mt-28"
          : "eventCard h-full scroll-mt-28"
      }
    >
      <Stack gap="sm" className="h-full">
        <Stack gap={4}>
          <Title order={2} fz="xl" lh={1.2}>
            {title}
          </Title>

          <Text size="sm" c="dimmed">
            {date}
          </Text>

          {timeLocation && (
            <Text size="xs" c="dimmed" fs="italic">
              {timeLocation}
            </Text>
          )}
        </Stack>

        <Group gap={6}>
          <Pill
            color={AUDIENCE_COLOR}
            href="/start"
            tooltip="Learn about our structure"
          >
            {audience}
          </Pill>
          {topics.map((topic) => (
            <Pill key={topic} color={TOPIC_COLORS[topic]}>
              {topic}
            </Pill>
          ))}
        </Group>

        <div className="eventCardBody">
          <Markdown>{description}</Markdown>
        </div>
      </Stack>
    </Paper>
  )
}
