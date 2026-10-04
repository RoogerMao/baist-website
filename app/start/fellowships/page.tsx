import type { Metadata } from "next"
import Link from "next/link"
import { Text, Title } from "@mantine/core"
import {
  FellowshipAccordion,
  FellowshipCard,
  fellowships,
} from "@/components/start/fellowships"
import { CopyEmail, Faq, type FaqItem } from "@/components/shared"
import { InvolvementCta } from "@/components/start/involvement-cta"

import faq from "@/components/shared/faq.module.css"
import link from "@/components/start/fellowships/fellowship-link.module.css"
import classes from "./page.module.css"

const fellowshipFaq: FaqItem[] = [
  {
    question: "Can I apply to multiple fellowships?",
    answer:
      "Yes! We encourage exploration, and have scheduled the fellowships accordingly for this reason. If you apply to multiple, we will still ask you to rank your preferences, in case we can't offer you a spot in all the fellowships you've applied for.",
  },
  {
    question: "How many applicants do you plan to accept?",
    answer:
      "We keep our fellowships small (around 8 to 10 people in each of the 4 fellowships). However, we'll make our final decisions based on applicant quality, and do our best to accommodate all applicants we'd like to have in our fellowships.",
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
          className={faq.faqLink}
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
  title: "Fellowships — Brown AI Safety Team",
}

export default function FellowshipsPage() {
  return (
    <main className="mx-auto w-full max-w-[85rem] px-[var(--page-padding-inline)] pb-16 pt-[calc(var(--header-height)+2rem)]">
      <Title order={1} ta="center" mb={4}>
        Fellowships
      </Title>

      <Text c="dimmed" ta="center" mb="sm" maw="46rem" mx="auto">
        Fall cohorts will run for 2 hours per week for 10 weeks, from September
        28th to December 4th. All fellowships will conclude with a 2-to-4-hour
        capstone project / presentation. Fall 2026 applications are now closed.
      </Text>

      <div className="mb-[var(--mantine-spacing-xl)] flex justify-center">
        <InvolvementCta
          label="Express Interest for Future Cohorts"
          href="https://airtable.com/appzrK1CeY3gVhlS6/pag7Xrvd9qKBIiWim/form"
          newTab
        />
      </div>

      <div className={classes.fellowshipCardRow}>
        <FellowshipCard title="Application Structure">
          <ol className={classes.fellowshipList}>
            <li>
              20-minute{" "}
              <span className={classes.fellowshipEmphasis}>
                written application form
              </span>
              .
            </li>
            <li>
              We will ask selected applicants to complete a 45-minute task and
              schedule a 15-minute interview during the week of Sunday, September
              20th to Friday, September 26th.
            </li>
            <li>We will release decisions on Sunday, September 27th.</li>
          </ol>
        </FellowshipCard>

        <FellowshipCard title="Application Advice">
          <ul className={classes.fellowshipList}>
            <li>
              We aren&rsquo;t trying to trick you! We respect and are thankful for
              your time&mdash;we&rsquo;ve designed the applications so that you
              have enough time to write a high-quality response within the
              recommended time.
            </li>
            <li>
              Please do not use AI in writing your answers. We want to get to know
              you and how you think.
            </li>
          </ul>
        </FellowshipCard>
      </div>

      <FellowshipAccordion
        fellowships={fellowships}
        defaultValue={fellowships.slice(0, 1).map((f) => f.value)}
        className="mt-[var(--mantine-spacing-xl)]"
      />

      <section
        className={`${faq.faqSection} mt-[calc(var(--mantine-spacing-xl)*2)]`}
      >
        <Title order={1} ta="center" mb={4}>
          FAQ
        </Title>

        <Text c="dimmed" ta="center" mb="xl" maw="46rem" mx="auto">
          If you have unanswered questions, please email us at <CopyEmail address="baist@brown.edu" />.
        </Text>

        <Faq items={fellowshipFaq} defaultOpenIndex={0} />
      </section>
    </main>
  )
}
