"use client";

import {
  ActionIcon,
  Avatar,
  Group,
  Paper,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { MaskIcon } from "@/components/mask-icon";
import { personCardId } from "./people-ids";

export interface Person {
  name: string;
  role?: string;
  photo?: string;
  email?: string;
  linkedin?: string;
  /** Personal scheduling link — renders a "Book a time" button on the card. */
  calendly?: string;
  /** Shown as a hover tooltip on a non-clickable button for people who take
      meeting requests some other way (i.e. have no `calendly`). */
  bookingNote?: string;
}

export function PersonCard({
  name,
  role,
  photo,
  email,
  linkedin,
  calendly,
  bookingNote,
}: Person) {
  const clipboard = useClipboard({ timeout: 1200 });
  const firstName = name.split(" ")[0];

  return (
    <Paper
      withBorder
      radius="md"
      p="md"
      id={personCardId(name)}
      className="personCard scroll-mt-28"
    >
      <Stack gap={4} align="center">
        {photo && <Avatar src={photo} alt={name} size={44} radius="xl" />}

        {/* name + socials share one row and wrap together when tight, so the
            icons always sit just after the name — photo or no photo */}
        <Group gap={6} wrap="wrap" align="center" justify="center">
          <Text fw={600} fz="h4" component="span">
            {name}
          </Text>

          <Group gap={2} wrap="nowrap" align="center">
            {email && (
              <Tooltip
                label={clipboard.copied ? "Copied!" : email}
                withArrow
                classNames={{ tooltip: "personTooltip" }}
              >
                <ActionIcon
                  size="sm"
                  variant="subtle"
                  color="gray"
                  className="personCardIcon"
                  data-copied={clipboard.copied || undefined}
                  aria-label={`Copy email address for ${name}`}
                  onClick={() => clipboard.copy(email)}
                >
                  <MaskIcon src="/people/email.svg" />
                </ActionIcon>
              </Tooltip>
            )}

            {linkedin && (
              <ActionIcon
                size="sm"
                variant="subtle"
                color="gray"
                className="personCardIcon"
                component="a"
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${name}'s LinkedIn profile in a new tab`}
              >
                <MaskIcon src="/people/linkedin.svg" />
              </ActionIcon>
            )}
          </Group>
        </Group>

        {role && (
          <Text c="dimmed" fz={12} ta="center" className="personCardRole">
            {role}
          </Text>
        )}

        {calendly ? (
          <a
            href={calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="personCardBooking"
          >
            Book a time with {firstName}
          </a>
        ) : (
          bookingNote && (
            <Tooltip
              label={bookingNote}
              /* Below the button, so the bubble clears the card: a hovered
                 card is filled with the same accent colour as the tooltip. */
              position="bottom"
              withArrow
              classNames={{ tooltip: "personTooltip personBookingTooltip" }}
            >
              {/* Not a link: focusable so the note is reachable by keyboard. */}
              <span className="personCardBooking" data-inert tabIndex={0}>
                Book a time with {firstName}
              </span>
            </Tooltip>
          )
        )}
      </Stack>
    </Paper>
  );
}
