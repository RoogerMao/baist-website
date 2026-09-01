"use client"

import { IconMoon, IconSun } from '@tabler/icons-react';
import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import classes from './action-toggle.module.css';

export function ActionToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <ActionIcon
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      variant="subtle"
      size="lg"
      radius="md"
      aria-label="Toggle color scheme"
    >
      <IconSun className={`${classes.icon} ${classes.light}`} stroke={1.5} />
      <IconMoon className={`${classes.icon} ${classes.dark}`} stroke={1.5} />
    </ActionIcon>
  );
}
