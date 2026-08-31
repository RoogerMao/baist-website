import Link from 'next/link';
import { Stack, Text } from '@mantine/core';

export interface LandingLinkProps {
  /** Destination route. */
  href: string;
  /** URL of the icon shown on the left of the button. */
  iconSrc: string;
  /** Primary label — rendered bold and larger. */
  title: string;
  /** Optional supporting text — rendered smaller. */
  description?: string;
  /** When true, fill the button with the accent color. */
  highlight?: boolean;
}

export function LandingLink({
  href,
  iconSrc,
  title,
  description,
  highlight = false,
}: LandingLinkProps) {
  return (
    <Link href={href} className="landingLink" data-highlight={highlight || undefined}>
      <span
        aria-hidden
        className="landingLinkIcon"
        style={{ maskImage: `url(${iconSrc})`, WebkitMaskImage: `url(${iconSrc})` }}
      />
      <Stack gap={2} style={{ minWidth: 0 }}>
        <Text fw={700} fz="lg" lh={1.2}>
          {title}
        </Text>
        {description ? (
          <Text fz="sm" style={{ opacity: 0.75 }}>
            {description}
          </Text>
        ) : null}
      </Stack>
    </Link>
  );
}
