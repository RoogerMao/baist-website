import type { Metadata } from "next"
import Link from "next/link"
import { Text, Title } from "@mantine/core"
import {
  PeopleHighlight,
  PeopleSection,
  SectionNav,
  executiveBoard,
  leadershipTeam,
} from "@/components/people"

export const metadata: Metadata = {
  title: "People — Brown AI Safety Team",
}

const sections = [
  { id: "leadership-team", label: "Leadership Team" },
  { id: "executive-board", label: "Executive Board" },
]

export default function PeoplePage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-[var(--page-padding-inline)] pb-16 pt-[calc(var(--header-height)+2rem)]">
      <PeopleHighlight />
      <SectionNav sections={sections} />

      <Title order={1} className="peopleHeading" ta="center" mb={4}>
        Our People
      </Title>
      <Text c="dimmed" ta="center" mb="xl">
        Read about our club structure{" "}
        <Link href="/start" className="peopleHeadingLink">
          here
        </Link>
      </Text>

      <PeopleSection
        id="leadership-team"
        title="Leadership Team"
        people={leadershipTeam}
      />
      <PeopleSection
        id="executive-board"
        title="Executive Board"
        people={executiveBoard}
      />
    </main>
  )
}
