import { Title } from "@mantine/core"
import { PersonCard, type Person } from "./person-card"

export interface PeopleSectionProps {
  /** used as the section's DOM id and scroll target */
  id: string
  title: string
  people: Person[]
}

export function PeopleSection({ id, title, people }: PeopleSectionProps) {
  return (
    <section id={id} className="mb-12 scroll-mt-24">
      <Title order={2} mb="md" ta="center" data-section-title>
        {title}
      </Title>

      <div className="peopleGrid">
        {people.map((person) => (
          <PersonCard key={person.name} {...person} />
        ))}
      </div>
    </section>
  )
}
