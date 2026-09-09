import type { Metadata } from "next"
import Link from "next/link"
import { Text, Title } from "@mantine/core"
import {
  FellowshipAccordion,
  FellowshipCard,
  fellowships,
} from "@/components/start/fellowships"
import { CopyEmail, Faq, type FaqItem } from "@/components/shared"

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
  title: "Fellowships — Brown AI Safety Team",
}

export default function FellowshipsPage() {
  return (
    <main className="mx-auto w-full max-w-[85rem] px-[var(--page-padding-inline)] pb-16 pt-[calc(var(--header-height)+2rem)]">
      <Title order={1} ta="center" mb={4}>
        Fellowships
      </Title>

      <Text c="dimmed" ta="center" mb="xl" maw="46rem" mx="auto">
        Fall cohorts will run for 2 hours per week for 10 weeks, from September
        28th to December 4th. All fellowships will conclude with a 2-to-4-hour
        capstone project / presentation. Fellowship applications are{" "}
        <Link href="#" className="fellowshipLink">
          open through September 18th
        </Link>
        ! If you have a strong background in AI safety, please speak to one of our{" "}
        <Link href="/people#executive-board" className="fellowshipLink">
          executive board members
        </Link>{" "}
        before applying for direct membership.
      </Text>

      <div className="fellowshipCardRow">
        <FellowshipCard title="Application Structure">
          <ol className="fellowshipList">
            <li>
              20-minute{" "}
              <Link href="#" className="fellowshipLink">
                written application form due September 18th
              </Link>
              .
              <ul className="fellowshipList fellowshipListNested">
                <li>
                  Fellowship facilitators will host office hours to answer
                  questions from Sunday, September 13th to Thursday, September
                  17th. <em className="fellowshipAccent">Hours coming soon.</em>
                </li>
              </ul>
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
          <ul className="fellowshipList">
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

      <section className="faqSection mt-[calc(var(--mantine-spacing-xl)*2)]">
        <Title order={1} ta="center" mb={4}>
          FAQ
        </Title>

        <Text c="dimmed" ta="center" mb="xl" maw="46rem" mx="auto">
          If you have unanswered questions, please stop by our office hours, or
          email us at <CopyEmail address="baist@brown.edu" />.
        </Text>

        <Faq items={fellowshipFaq} defaultOpenIndex={0} />
      </section>
    </main>
  )
}
