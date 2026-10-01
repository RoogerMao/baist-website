import { Title } from "@mantine/core"
import { PersonCard, type Person } from "./person-card"

import classes from "./people-section.module.css"

export interface PeopleSectionProps {
  /** used as the section's DOM id and scroll target */
  id: string
  title: string
  people: Person[]
  /** pack cards into columns by their own height instead of a fixed grid */
  masonry?: boolean
}

export function PeopleSection({ id, title, people, masonry }: PeopleSectionProps) {
  return (
    <section id={id} className="mb-12 scroll-mt-24">
      <Title order={2} mb="md" ta="center" data-section-title>
        {title}
      </Title>

      <div className={masonry ? classes.peopleMasonry : classes.peopleGrid}>
        {people.map((person) =>
          masonry ? (
            <div key={person.name} className={classes.peopleMasonryItem}>
              <PersonCard {...person} />
            </div>
          ) : (
            <PersonCard key={person.name} {...person} />
          )
        )}
      </div>
    </section>
  )
}
