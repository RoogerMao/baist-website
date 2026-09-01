import ReactMarkdown from "react-markdown"
import { Anchor, List, Text, Title } from "@mantine/core"

/**
 * Renders a trusted Markdown string with Mantine typography. Used for event
 * descriptions. Deliberately small — supports the inline/basic block syntax an
 * event blurb needs (emphasis, links, lists, headings) and nothing exotic.
 */
export function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => (
          <Text size="sm" mb="xs">
            {children}
          </Text>
        ),
        a: ({ href, children }) => (
          <Anchor href={href} target="_blank" rel="noopener noreferrer" size="sm">
            {children}
          </Anchor>
        ),
        ul: ({ children }) => (
          <List size="sm" mb="xs">
            {children}
          </List>
        ),
        ol: ({ children }) => (
          <List type="ordered" size="sm" mb="xs">
            {children}
          </List>
        ),
        li: ({ children }) => <List.Item>{children}</List.Item>,
        h1: ({ children }) => (
          <Title order={4} mb="xs">
            {children}
          </Title>
        ),
        h2: ({ children }) => (
          <Title order={4} mb="xs">
            {children}
          </Title>
        ),
        h3: ({ children }) => (
          <Title order={5} mb="xs">
            {children}
          </Title>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  )
}
