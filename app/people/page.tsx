import type { Metadata } from "next"
import { PeopleSection, SectionNav, type Person } from "@/components/people"

export const metadata: Metadata = {
  title: "People — Brown AI Safety Team",
}

const sections = [
  { id: "leadership-team", label: "Leadership Team" },
  { id: "executive-board", label: "Executive Board" },
]

const leadershipTeam: Person[] = [
  { name: "Aalyaan Ali", role: "Communications and Programming Lead", email: "aalyaan_ali@brown.edu", linkedin: "https://www.linkedin.com/in/aalyaan/" }, 
  { name: "Camden Wright", role: "Technical Fellowship Lead", email: "camden_wright@brown.edu" },
  { name: "Isaac Bitran", role: "Communications and Programming Lead", email: "isaac_bitran@brown.edu"}, 
  { name: "Solly Goluboff-Schragger", role: "AI and Society Workshops Project Lead", email: "soloman_goluboff-schragger@brown.edu", linkedin: "https://www.linkedin.com/in/solomongs/"}
]

const executiveBoard: Person[] = [
  { name: "Garrett Xu", role: "Director of AI Safety Fundamentals Fellowship", email: "garret_xu@brown.edu", linkedin: "https://www.linkedin.com/in/garrett-xu-575420228/" },
  { name: "Raen Kao", role: "Director of Technical Governance Fellowship", email: "raen_kao@brown.edu", linkedin: "https://www.linkedin.com/in/raenkao/"}, 
  { name: "Roger Mao", role: "Director of Technical Research Fellowship and Programming", email: "roger_mao@brown.edu", linkedin: "https://www.linkedin.com/in/roger-y-mao/"}
]

export default function PeoplePage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-[var(--page-padding-inline)] pb-16 pt-[calc(var(--header-height)+2rem)]">
      <SectionNav sections={sections} />
      <PeopleSection
        id="leadership-team"
        title="Leadership Team"
        people={leadershipTeam}
      />
      <PeopleSection
        id="executive-board"
        title="Executive Board"
        people={executiveBoard}
      />
    </main>
  )
}
