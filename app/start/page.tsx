import type { Metadata } from "next"
import Link from "next/link"
import { Text, Title } from "@mantine/core"
import { InvolvementCard, type InvolvementLevel } from "@/components/start"
import { CopyEmail, Faq, type FaqItem } from "@/components/shared"

const startFaq: FaqItem[] = [
  {
    question:
      "Should I contact an executive board member about direct membership?",
    answer:
      "As a rule of thumb, we recommend this if you have spent around 20+ hours in AI Safety, though this will vary from person to person. We think people get the most out of member events and projects if they have previous experience.",
  },
  {
    question: "Why does BAIST have fellowships?",
    answer: (
      <>
        <p>BAIST has fellowships for the following reasons:</p>
        <ul>
          <li>
            They provide you a smaller, more structured community, which can
            serve as your home base before becoming a member
          </li>
          <li>
            They build research, governance, and critical thinking skills in
            addition to surveying AI safety as a societal issue
          </li>
          <li>
            They help the leadership team know potential members over an
            extended period of time, not just a short written application and
            interview.
          </li>
        </ul>
      </>
    ),
  },
  {
    question:
      "I didn't get accepted into a fellowship, but would like to get involved this semester. What can I do?",
    answer: (
      <p>
        We accept member applications on a rolling basis! Feel free to request a
        1:1 with a facilitator for any of the fellowships you applied to, and
        they can give you advice for working through the syllabus individually,
        and provide support, as their schedule allows. You can also consider
        looking through online courses, similar to those by{" "}
        <Link
          href="https://bluedot.org/"
          className="faqLink"
          target="_blank"
          rel="noopener noreferrer"
        >
          BlueDot Impact
        </Link>
        .
      </p>
    ),
  },
]

export const metadata: Metadata = {
  title: "Our Structure — Brown AI Safety Team",
}

const levels: InvolvementLevel[] = [
  {
    title: "General Body",
    admissionProcess: "Open to anyone",
    abilities: [
      "Attend public events",
      "Receive our weekly mailing list",
      "Request a 1:1 with any executive board member",
    ],
    ctas: [
      {
        label: "Join our mailing list",
        href: "https://airtable.com/appzrK1CeY3gVhlS6/pag7Xrvd9qKBIiWim/form",
        newTab: true,
      },
    ],
  },
  {
    title: "Fellow",
    admissionProcess: "Applications every semester",
    highlighted: true,
    abilities: [
      "Attend cohort and select member events",
      "Schedule 1:1's with their fellowship facilitator and any executive board member",
    ],
    ctas: [
      { label: "Apply Here", href: "/start/fellowships", white: true },
    ],
  },
  {
    title: "Member",
    admissionProcess: "Rolling Applications",
    note: "If you'd like to directly apply for membership, please speak to an executive board member.",
    abilities: [
      "Attend all club events",
      "Propose and contribute to club projects",
    ],
    ctas: [
      {
        label: "Apply here",
        href: "https://airtable.com/appzrK1CeY3gVhlS6/pagigZisNeZjn623f/form",
        newTab: true,
      },
    ],
  },
  {
    title: "Club Leadership / Executive Board",
    abilities: ["Members leading (multiple) club fellowships and events"],
  },
]

export default function StartPage() {
  return (
    <main className="mx-auto w-full max-w-[85rem] px-[var(--page-padding-inline)] pb-16 pt-[calc(var(--header-height)+2rem)]">
      <Title order={1} mb={4} ta="center">
        Our Structure
      </Title>
      <Text fs="italic" c="dimmed" ta="center" mb="xl">
        All Fall 2026 fellowship applications are due by 11:59 PM EDT on Friday, September 18th
      </Text>

      <div className="flex flex-col gap-4">
        {levels.map((level) => (
          <InvolvementCard key={level.title} {...level} />
        ))}
      </div>

      <section className="faqSection mt-[calc(var(--mantine-spacing-xl)*2)]">
        <Title order={1} ta="center" mb={4}>
          FAQ
        </Title>

        <Text c="dimmed" ta="center" mb="xl" maw="46rem" mx="auto">
          If you have unanswered questions, please stop by our office hours, or
          email us at <CopyEmail address="baist@brown.edu" />.
        </Text>

        <Faq items={startFaq} defaultOpenIndex={0} />
      </section>
    </main>
  )
}
