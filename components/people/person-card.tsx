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

export interface Person {
  name: string;
  role?: string;
  photo?: string;
  email?: string;
  linkedin?: string;
}
function MaskIcon({ src }: { src: string }) {
  return (
    <span
      aria-hidden
      style={{
        display: "block",
        width: "1rem",
        height: "1rem",
        backgroundColor: "currentColor",
        maskImage: `url(${src})`,
        maskRepeat: "no-repeat",
        maskPosition: "center",
        maskSize: "contain",
        WebkitMaskImage: `url(${src})`,
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        WebkitMaskSize: "contain",
      }}
    />
  );
}

export function PersonCard({ name, role, photo, email, linkedin }: Person) {
  const clipboard = useClipboard({ timeout: 1200 });

  return (
    <Paper withBorder radius="md" p="md" className="h-full">
      <Stack gap={4} align="center" justify="center" className="h-full">
        {photo && <Avatar src={photo} alt={name} size={44} radius="xl" />}

        {/* name + socials share one row and wrap together when tight, so the
            icons always sit just after the name — photo or no photo */}
        <Group gap={6} wrap="wrap" align="center" justify="center">
          <Text fw={600} component="span">
            {name}
          </Text>

          <Group gap={2} wrap="nowrap" align="center">
            {email && (
              <Tooltip label={clipboard.copied ? "Copied!" : email} withArrow>
                <ActionIcon
                  size="sm"
                  variant="subtle"
                  color="gray"
                  aria-label={`Copy email address for ${name}`}
                  onClick={() => clipboard.copy(email)}
                >
                  <MaskIcon src="/people/email.svg" />
                </ActionIcon>
              </Tooltip>
            )}

            {linkedin && (
              <Tooltip label="LinkedIn" withArrow>
                <ActionIcon
                  size="sm"
                  variant="subtle"
                  color="gray"
                  component="a"
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${name}'s LinkedIn profile in a new tab`}
                >
                  <MaskIcon src="/people/linkedin.svg" />
                </ActionIcon>
              </Tooltip>
            )}
          </Group>
        </Group>

        {role && (
          <Text c="dimmed" size="sm" ta="center">
            {role}
          </Text>
        )}
      </Stack>
    </Paper>
  );
}
