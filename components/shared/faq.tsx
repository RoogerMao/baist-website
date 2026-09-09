"use client"

import { useId, useState } from "react"
import { Box, Text, Title, UnstyledButton } from "@mantine/core"
import { AnimatePresence, motion } from "motion/react"

import classes from "./faq.module.css"

export interface FaqItem {
  question: string
  /** Answer body — a string, or any node for richer formatting. */
  answer: React.ReactNode
}

/** Plus sign whose vertical bar collapses into the horizontal one when open. */
function PlusMinusIcon({ open }: { open: boolean }) {
  return (
    <span className={classes.faqIcon} aria-hidden>
      <span className={classes.faqIconBar} />
      <motion.span
        className={`${classes.faqIconBar} ${classes.faqIconBarVertical}`}
        animate={{ rotate: open ? 0 : 90, opacity: open ? 0 : 1 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      />
    </span>
  )
}

function FaqRow({ item, defaultOpen }: { item: FaqItem; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const panelId = useId()
  const controlId = useId()

  function toggle(event: React.SyntheticEvent) {
    // Let a link inside the answer navigate without also toggling the row.
    if (event.target instanceof HTMLElement && event.target.closest("a")) return
    setOpen((value) => !value)
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.target !== event.currentTarget) return
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      setOpen((value) => !value)
    }
  }

  return (
    // The whole row (question + expanded answer) toggles on click, not just
    // the question — UnstyledButton wouldn't allow nesting the answer's own
    // interactive content (links), so this is a div with button semantics.
    <Box
      id={controlId}
      className={classes.faqRow}
      role="button"
      tabIndex={0}
      aria-expanded={open}
      aria-controls={panelId}
      onClick={toggle}
      onKeyDown={onKeyDown}
    >
      <UnstyledButton
        component="div"
        tabIndex={-1}
        className={classes.faqControl}
      >
        <Title order={3} fz="md" fw={600} lh={1.4}>
          {item.question}
        </Title>
        <PlusMinusIcon open={open} />
      </UnstyledButton>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="panel"
            id={panelId}
            role="region"
            aria-labelledby={controlId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <Text size="sm" c="dimmed" component="div" className={classes.faqAnswer}>
              {item.answer}
            </Text>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  )
}

/**
 * Accordion-style FAQ list with a plus/minus toggle per question, modelled on
 * examples.motion.dev/ui/sections/faq-plus-minus. Items open independently.
 * Styling uses Mantine tokens (see faq.module.css).
 */
export function Faq({
  items,
  defaultOpenIndex,
  className,
}: {
  items: FaqItem[]
  /** Index of the item expanded on first render, if any. */
  defaultOpenIndex?: number
  className?: string
}) {
  return (
    <div className={className ? `${classes.faq} ${className}` : classes.faq}>
      {items.map((item, index) => (
        <FaqRow
          key={item.question}
          item={item}
          defaultOpen={index === defaultOpenIndex}
        />
      ))}
    </div>
  )
}
