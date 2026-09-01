import {
  Container,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core"
import { MaskIcon } from "@/components/mask-icon"
import { TOPIC_COLORS, type CalendarEvent, type EventAudience } from "./calendar-types"
import { eventId, pinnedEventsFor } from "./calendar-utils"
import { Pill } from "./pill"

const SECTIONS: { title: string; audience: EventAudience }[] = [
  { title: "General Body", audience: "General Body" },
  { title: "Fellows", audience: "Fellows" },
  { title: "Members", audience: "Members" },
]

function PreviewCard({
  event,
  onSelect,
}: {
  event: CalendarEvent
  onSelect: (id: string) => void
}) {
  return (
    <UnstyledButton
      className="pinnedPreview"
      onClick={() => onSelect(eventId(event))}
    >
      <Group align="baseline" gap={6} wrap="wrap">
        <Title order={4} lh={1.3}>
          {event.title}
        </Title>
        {event.topics.map((topic) => (
          <Pill key={topic} color={TOPIC_COLORS[topic]}>
            {topic}
          </Pill>
        ))}
      </Group>
      <Text size="xs" c="dimmed" mt="sm">
        {event.date}
      </Text>
    </UnstyledButton>
  )
}

function EmptyPreview() {
  return (
    <div className="pinnedPreview pinnedPreviewEmpty">
      <Text fw={600} size="sm">
        Hang tight!
      </Text>
      <Text size="xs" c="dimmed" mt={6}>
        Nothing scheduled yet — check back soon.
      </Text>
    </div>
  )
}

export function PinnedSection({
  events,
  onSelect,
}: {
  events: CalendarEvent[]
  onSelect: (id: string) => void
}) {
  return (
    <section className="mb-12">
      <Group justify="center" gap={8} mb="md">
        <Title order={2} ta="center">
          Pinned
        </Title>
        <MaskIcon src="/pin.svg" size={22} className="pinnedIcon" />
      </Group>

      <Container size="lg" px={0}>
        <Paper radius={32} p="xl" className="pinnedCard">
          <div className="pinnedGrid">
            {SECTIONS.map((section) => {
              const picks = pinnedEventsFor(events, section.audience)
              return (
                <div key={section.audience} className="pinnedCol">
                  <Title order={2} fz="md" ta="center" mb="sm">
                    {section.title}
                  </Title>
                  <Stack gap="xs">
                    {picks.length > 0 ? (
                      picks.map((event) => (
                        <PreviewCard
                          key={eventId(event)}
                          event={event}
                          onSelect={onSelect}
                        />
                      ))
                    ) : (
                      <EmptyPreview />
                    )}
                  </Stack>
                </div>
              )
            })}
          </div>
        </Paper>
      </Container>
    </section>
  )
}
