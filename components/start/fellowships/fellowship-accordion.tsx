"use client"

import Link from "next/link"
import { Accordion, Stack, Text, Title } from "@mantine/core"
import { MaskIcon } from "@/components/mask-icon"
import { AuthorList } from "./author-link"

export interface Fellowship {
  /** Stable key / accordion item value. */
  value: string
  /** Path to an SVG used as a `currentColor` mask icon. */
  icon: string
  /** Fellowship name — rendered as the accordion heading. */
  title: string
  /** When the cohort meets — shown italicised next to the title. */
  schedule?: string
  /** Names of the people who designed / facilitate the fellowship. */
  authors: string[]
  /** Short prose overview of what the fellowship covers. */
  description: string
  /** Tentative curriculum topics, rendered as chips. */
  topics: string[]
  /** Links to past syllabi. */
  pastCurriculums: { label: string; href: string }[]
}

function FellowshipPanel({
  authors,
  description,
  topics,
  pastCurriculums,
}: Omit<Fellowship, "value" | "icon" | "title">) {
  return (
    <Stack gap="md" pt="xs">
      <Text size="sm" c="dimmed">
        <AuthorList names={authors} />
      </Text>

      <Text size="sm">{description}</Text>

      <div className="fellowshipChips">
        <Title order={3} fz="sm" fw={600} className="fellowshipChipsLabel">
          Topics Covered:
        </Title>
        {topics.map((topic) => (
          <span key={topic} className="fellowshipChip">
            {topic}
          </span>
        ))}
      </div>

      {pastCurriculums.length > 0 && (
        <Text size="sm">
          Sample past curriculums:{" "}
          {pastCurriculums.map((item, index) => (
            <span key={item.href}>
              <Link
                href={item.href}
                className="fellowshipLink"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
              </Link>
              {index < pastCurriculums.length - 1 ? " and " : ""}
            </span>
          ))}
        </Text>
      )}
    </Stack>
  )
}

/**
 * Template for the fellowships list. Each fellowship is a Mantine `Accordion`
 * item — a chevron control showing the icon + heading, and a panel with authors,
 * description, topic chips, and past curriculums. Uses Mantine's default
 * chevron rotation and panel transition.
 */
export function FellowshipAccordion({
  fellowships,
  defaultValue,
  className,
}: {
  fellowships: Fellowship[]
  defaultValue?: string
  className?: string
}) {
  return (
    <Accordion
      variant="separated"
      radius="md"
      defaultValue={defaultValue}
      className={
        className ? `fellowshipAccordion ${className}` : "fellowshipAccordion"
      }
    >
      {fellowships.map((fellowship) => (
        <Accordion.Item key={fellowship.value} value={fellowship.value}>
          <Accordion.Control
            icon={<MaskIcon src={fellowship.icon} size="1.5rem" />}
          >
            <span className="fellowshipControlLabel">
              <Title order={2} fz="xl" fw={700} lh={1.2}>
                {fellowship.title}
              </Title>
              {fellowship.schedule && (
                <span className="fellowshipSchedule">{fellowship.schedule}</span>
              )}
            </span>
          </Accordion.Control>
          <Accordion.Panel>
            <FellowshipPanel
              authors={fellowship.authors}
              description={fellowship.description}
              topics={fellowship.topics}
              pastCurriculums={fellowship.pastCurriculums}
            />
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}
