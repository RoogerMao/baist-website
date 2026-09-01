import type { ReactNode } from "react"
import { Paper, Title } from "@mantine/core"

export interface FellowshipCardProps {
  /** Heading rendered at the top of the card. */
  title: string
  /** Card body — typically a list of steps or notes. */
  children: ReactNode
}

export function FellowshipCard({ title, children }: FellowshipCardProps) {
  return (
    <Paper withBorder radius="md" p="lg" className="fellowshipCard h-full">
      <Title order={2} fz="xl" mb="sm">
        {title}
      </Title>
      {children}
    </Paper>
  )
}
