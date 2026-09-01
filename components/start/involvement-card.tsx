import { Paper, Stack, Text } from "@mantine/core"
import { InvolvementCta } from "./involvement-cta"

export interface InvolvementLevel {
  /** Name of this level of involvement — e.g. "Fellow". */
  title: string
  /** How you get in — rendered italicised and smaller, inline with the title. */
  admissionProcess?: string
  /** What this level lets you do. */
  abilities: string[]
  /** Optional call(s) to action, rendered as ripple buttons at the foot of the card. */
  ctas?: {
    label: string
    href: string
    /** Force a white background (otherwise it matches the card's surface). */
    white?: boolean
  }[]
  /** Fill the card with the accent colour. */
  highlighted?: boolean
}

export function InvolvementCard({
  title,
  admissionProcess,
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
      className="involvementCard h-full"
      data-highlight={highlighted || undefined}
    >
      <Stack gap="md" className="h-full">
        <div className="involvementCardHeading">
          <Text fw={700} fz="lg" lh={1.2}>
            {title}
          </Text>
          {admission}
        </div>

        <ul className="involvementCardAbilities">
          {abilities.map((ability) => (
            <li key={ability}>{ability}</li>
          ))}
        </ul>

        {ctas && ctas.length > 0 && (
          <div className="involvementCardCtas">
            {ctas.map((cta) => (
              <InvolvementCta
                key={cta.label}
                label={cta.label}
                href={cta.href}
                white={cta.white}
              />
            ))}
          </div>
        )}
      </Stack>
    </Paper>
  )
}
