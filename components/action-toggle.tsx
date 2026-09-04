"use client"

import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { MaskIcon } from './mask-icon';
import classes from './action-toggle.module.css';

export function ActionToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <ActionIcon
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      variant="filled"
      size="lg"
      radius="md"
      className="viewToggle"
      aria-label="Toggle color scheme"
    >
      <MaskIcon src="/bear/bear-head.svg" size={22} className={classes.icon} />
    </ActionIcon>
  );
}
