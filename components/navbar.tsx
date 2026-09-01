"use client"

import { useState } from 'react';
import Link from 'next/link';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { IconChevronDown } from '@tabler/icons-react';
import {
  Burger,
  Center,
  Divider,
  Drawer,
  Group,
  Menu,
  ScrollArea,
  UnstyledButton
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MaskIcon } from './mask-icon';
import { ActionToggle } from './action-toggle';

interface NavSubLink {
  link: string;
  label: string;
  /** Accent + highlight this entry to draw the eye. */
  accent?: boolean;
  /** Path to an SVG rendered as a `currentColor` mask icon before the label. */
  icon?: string;
}

interface NavLink {
  link: string;
  label: string;
  accent?: boolean;
  links?: NavSubLink[];
}

const links: NavLink[] = [
  { link: '/people', label: 'People' },
  {
    link: '/start',
    label: 'Get Started',
    accent: true,
    links: [
      { link: '/start/calendar', label: 'Calendar' },
      {
        link: '/start/fellowships',
        label: 'Apply to Our Fellowships',
        accent: true,
        icon: '/star.svg',
      },
    ],
  }
];

export function HeaderMenu() {
  const [opened, { toggle, close }] = useDisclosure(false);

  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  useMotionValueEvent(scrollY, 'change', (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(current > previous && current > 150 && !opened);
  });

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item
        key={item.link}
        component={Link}
        href={item.link}
        className={item.accent ? 'menuItemAccent' : undefined}
        rightSection={
          item.icon ? <MaskIcon src={item.icon} size={16} /> : undefined
        }
      >
        {item.label}
      </Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            {/* hover opens the dropdown; clicking still navigates to the page */}
            <UnstyledButton
              component={Link}
              href={link.link}
              className={link.accent ? 'link linkAccent' : 'link'}
            >
              <Center>
                <span className="linkLabel">{link.label}</span>
                <IconChevronDown size={14} stroke={1.5} />
              </Center>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown className="navMenuDropdown">{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link
        key={link.label}
        href={link.link}
        className={link.accent ? 'link linkAccent' : 'link'}
      >
        {link.label}
      </Link>
    );
  });

  return (
    <motion.header
      className="header"
      animate={{ y: hidden ? '-100%' : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="inner">
        <Link href="/" className="brand">Brown AI Safety Team</Link>
        <Group gap="lg">
          <Group gap={5} visibleFrom="sm">
            {items}
          </Group>
          <ActionToggle />
          <Burger
            opened={opened}
            onClick={toggle}
            size="sm"
            hiddenFrom="sm"
            aria-label="Toggle navigation"
          />
        </Group>
      </div>

      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />
          {links.map((link) => {
            if (link.links) {
              return <DrawerLinksGroup key={link.label} link={link} onNavigate={close} />;
            }

            return (
              <Link
                key={link.label}
                href={link.link}
                className={link.accent ? 'link linkAccent' : 'link'}
                onClick={close}
              >
                {link.label}
              </Link>
            );
          })}
        </ScrollArea>
      </Drawer>
    </motion.header>
  );
}

function DrawerLinksGroup({
  link,
  onNavigate,
}: {
  link: NavLink;
  onNavigate?: () => void;
}) {
  return (
    <>
      <Link
        href={link.link}
        className={link.accent ? 'link linkAccent' : 'link'}
        onClick={onNavigate}
      >
        {link.label}
      </Link>
      {link.links?.map((subLink) => (
        <Link
          key={subLink.link}
          href={subLink.link}
          className={subLink.accent ? 'subLink subLinkAccent' : 'subLink'}
          onClick={onNavigate}
        >
          {subLink.label}
          {subLink.icon && <MaskIcon src={subLink.icon} size={16} />}
        </Link>
      ))}
    </>
  );
}
