import Link from "next/link"
import { findPerson } from "@/components/people/people-data"
import { personCardId } from "@/components/people/people-ids"

import classes from "./author-link.module.css"

/**
 * A fellowship author's name. When the person has a card on the People page the
 * name links there and their card flashes on arrival; otherwise it renders as
 * plain accented text.
 */
export function AuthorLink({ name }: { name: string }) {
  const person = findPerson(name)

  if (!person) {
    return <span className={classes.authorName}>{name}</span>
  }

  return (
    <Link href={`/people#${personCardId(name)}`} className={`${classes.authorName} ${classes.authorLink}`}>
      {name}
    </Link>
  )
}

/** Renders a list of names as "A, B, and C" with each name linked. */
export function AuthorList({ names }: { names: string[] }) {
  return (
    <>
      {names.map((name, index) => (
        <span key={name}>
          <AuthorLink name={name} />
          {index < names.length - 2
            ? ", "
            : index === names.length - 2
              ? names.length > 2
                ? ", and "
                : " and "
              : ""}
        </span>
      ))}
    </>
  )
}
