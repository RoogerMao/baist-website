"use client"

import Link from "next/link"
import { Accordion, Stack, Text, Title } from "@mantine/core"
import { MaskIcon } from "@/components/mask-icon"
import { InvolvementCta } from "../involvement-cta"
import { AuthorList } from "./author-link"

import classes from "./fellowship-accordion.module.css"
import link from "./fellowship-link.module.css"

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
  /**
   * Short prose overview of what the fellowship covers. Supports inline
   * markdown-style links — `[label](https://…)` — which open in a new tab.
   */
  description: string
  /** Tentative curriculum topics, rendered as chips. */
  topics: string[]
  /** Links to past syllabi. */
  pastCurriculums: { label: string; href: string }[]
  /** Application form, opened in a new tab from the foot of the panel. */
  applyHref?: string
}

const DESCRIPTION_LINK = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g

/** Renders a description, turning `[label](href)` spans into external links. */
function DescriptionText({ description }: { description: string }) {
  const parts: React.ReactNode[] = []
  let cursor = 0

  for (const match of description.matchAll(DESCRIPTION_LINK)) {
    const [raw, label, href] = match
    parts.push(description.slice(cursor, match.index))
    parts.push(
      <Link
        key={href}
        href={href}
        className={link.fellowshipLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
      </Link>,
    )
    cursor = match.index + raw.length
  }

  parts.push(description.slice(cursor))
  return <>{parts}</>
}

function FellowshipPanel({
  authors,
  description,
  topics,
  pastCurriculums,
  applyHref,
}: Omit<Fellowship, "value" | "icon" | "title">) {
  return (
    <Stack gap="md" pt="xs">
      <Text size="sm" c="dimmed">
        <AuthorList names={authors} />
      </Text>

      <Text size="sm">
        <DescriptionText description={description} />
      </Text>

      <div className={classes.fellowshipChips}>
        <Title order={3} fz="sm" fw={600} className={classes.fellowshipChipsLabel}>
          Topics Covered:
        </Title>
        {topics.map((topic) => (
          <span key={topic} className={classes.fellowshipChip}>
            {topic}
          </span>
        ))}
      </div>

      {pastCurriculums.length > 0 && (
        <Text size="sm" fs="italic">
          Sample past curriculums:{" "}
          {pastCurriculums.map((item, index) => (
            <span key={item.href}>
              <Link
                href={item.href}
                className={link.fellowshipLink}
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

      {applyHref && (
        <InvolvementCta
          label="Apply Here"
          href={applyHref}
          newTab
          className={classes.fellowshipApplyCta}
        />
      )}
    </Stack>
  )
}

/**
 * Template for the fellowships list. Each fellowship is a Mantine `Accordion`
 * item — a chevron control showing the icon + heading, and a panel with authors,
 * description, topic chips, and past curriculums. Any number of panels may be
 * open at once. Uses Mantine's default chevron rotation and panel transition.
 */
export function FellowshipAccordion({
  fellowships,
  defaultValue,
  className,
}: {
  fellowships: Fellowship[]
  /** Items open on first render — several may be open at once. */
  defaultValue?: string[]
  className?: string
}) {
  return (
    <Accordion
      multiple
      variant="separated"
      radius="md"
      defaultValue={defaultValue}
      className={
        className
          ? `${classes.fellowshipAccordion} ${className}`
          : classes.fellowshipAccordion
      }
    >
      {fellowships.map((fellowship) => (
        <Accordion.Item
          key={fellowship.value}
          value={fellowship.value}
          className={`fellowshipItem fellowshipItem--${fellowship.value}`}
        >
          <Accordion.Control
            icon={<MaskIcon src={fellowship.icon} size="1.5rem" />}
          >
            <span className={classes.fellowshipControlLabel}>
              <Title order={2} fz="xl" fw={700} lh={1.2}>
                {fellowship.title}
              </Title>
              {fellowship.schedule && (
                <span className={classes.fellowshipSchedule}>{fellowship.schedule}</span>
              )}
            </span>
          </Accordion.Control>
          <Accordion.Panel>
            <FellowshipPanel
              authors={fellowship.authors}
              description={fellowship.description}
              topics={fellowship.topics}
              pastCurriculums={fellowship.pastCurriculums}
              applyHref={fellowship.applyHref}
            />
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}
