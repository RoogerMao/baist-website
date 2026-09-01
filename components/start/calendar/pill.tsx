import Link from "next/link"
import { Badge, Tooltip } from "@mantine/core"

interface PillProps {
  color: string
  children: string
  /** When set, the pill becomes a link with a pointer cursor + tooltip. */
  href?: string
  tooltip?: string
}

/** Rounded pill with the label in a darker shade of the accent colour. */
export function Pill({ color, children, href, tooltip }: PillProps) {
  const badge = (
    <Badge
      color={color}
      variant="light"
      radius="xl"
      style={href ? { cursor: "pointer" } : undefined}
      styles={{
        label: {
          color: `light-dark(var(--mantine-color-${color}-9), var(--mantine-color-${color}-2))`,
        },
      }}
    >
      {children}
    </Badge>
  )

  const content = href ? (
    <Link href={href} style={{ textDecoration: "none", lineHeight: 0 }}>
      {badge}
    </Link>
  ) : (
    badge
  )

  return tooltip ? (
    <Tooltip
      label={tooltip}
      withArrow
      events={{ hover: true, focus: true, touch: true }}
    >
      {content}
    </Tooltip>
  ) : (
    content
  )
}
