"use client"

import { useState } from 'react';
import Link from 'next/link';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { IconChevronDown } from '@tabler/icons-react';
import {
  Burger,
  Center,
  Collapse,
  Divider,
  Drawer,
  Group,
  Menu,
  ScrollArea,
  UnstyledButton
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

const links = [
  { link: '/people', label: 'People' },
  {
    link: '#1',
    label: 'Get Started',
    links: [
      { link: '/start/events', label: 'Events' },
      { link: '/start/fellowships', label: 'Fellowships' },
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
      <Menu.Item key={item.link} component={Link} href={item.link}>
        {item.label}
      </Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <UnstyledButton className="link">
              <Center>
                <span className="linkLabel">{link.label}</span>
                <IconChevronDown size={14} stroke={1.5} />
              </Center>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link key={link.label} href={link.link} className="link">
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
        <Group gap={5} visibleFrom="sm">
          {items}
        </Group>
        <Burger
          opened={opened}
          onClick={toggle}
          size="sm"
          hiddenFrom="sm"
          aria-label="Toggle navigation"
        />
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
                className="link"
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
  link: { link: string; label: string; links?: { link: string; label: string }[] };
  onNavigate?: () => void;
}) {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
      <UnstyledButton className="link" onClick={toggle}>
        <Center inline>
          <span className="linkLabel">{link.label}</span>
          <IconChevronDown size={14} stroke={1.5} />
        </Center>
      </UnstyledButton>
      <Collapse expanded={opened}>
        {link.links?.map((subLink) => (
          <Link
            key={subLink.link}
            href={subLink.link}
            className="subLink"
            onClick={onNavigate}
          >
            {subLink.label}
          </Link>
        ))}
      </Collapse>
    </>
  );
}
