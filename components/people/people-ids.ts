/** URL-safe slug for a person, e.g. "Roger Mao" -> "roger-mao". */
export function personSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

/** DOM id of a person's card on the People page. */
export function personCardId(name: string): string {
  return `person-${personSlug(name)}`
}
