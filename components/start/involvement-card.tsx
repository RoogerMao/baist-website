import { Paper, Stack, Text } from "@mantine/core"
import { InvolvementCta } from "./involvement-cta"

import classes from "./involvement-card.module.css"

export interface InvolvementLevel {
  /** Name of this level of involvement — e.g. "Fellow". */
  title: string
  /** How you get in — rendered italicised and smaller, inline with the title. */
  admissionProcess?: string
  /** Aside shown italicised above the ability list — e.g. how to apply. */
  note?: string
  /** What this level lets you do. */
  abilities: string[]
  /** Optional call(s) to action, rendered as ripple buttons at the foot of the card. */
  ctas?: {
    label: string
    href: string
    /** Force a white background (otherwise it matches the card's surface). */
    white?: boolean
    /** Open in a new tab — for off-site application forms. */
    newTab?: boolean
  }[]
  /** Fill the card with the accent colour. */
  highlighted?: boolean
}

export function InvolvementCard({
  title,
  admissionProcess,
  note,
  abilities,
  ctas,
  highlighted = false,
}: InvolvementLevel) {
  const admission = admissionProcess ? (
    <Text fz="sm" fs="italic" c={highlighted ? undefined : "dimmed"}>
      {admissionProcess}
    </Text>
  ) : null

  return (
    <Paper
      withBorder
      radius="md"
      p="lg"
      className={`${classes.involvementCard} h-full`}
      data-highlight={highlighted || undefined}
    >
      <Stack gap="md" className="h-full">
        <div className={classes.involvementCardHeading}>
          <Text fw={700} fz="lg" lh={1.2}>
            {title}
          </Text>
          {admission}
        </div>

        {note && (
          <Text fz="sm" fs="italic" className={classes.involvementCardNote}>
            {note}
          </Text>
        )}

        <ul className={classes.involvementCardAbilities}>
          {abilities.map((ability) => (
            <li key={ability}>{ability}</li>
          ))}
        </ul>

        {ctas && ctas.length > 0 && (
          <div className={classes.involvementCardCtas}>
            {ctas.map((cta) => (
              <InvolvementCta
                key={cta.label}
                label={cta.label}
                href={cta.href}
                white={cta.white}
                newTab={cta.newTab}
              />
            ))}
          </div>
        )}
      </Stack>
    </Paper>
  )
}
