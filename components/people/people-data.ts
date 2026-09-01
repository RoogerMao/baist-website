import type { Person } from "./person-card"

export const leadershipTeam: Person[] = [
  {
    name: "Aalyaan Ali",
    role: "Communications and Programming Lead",
    email: "aalyaan_ali@brown.edu",
    linkedin: "https://www.linkedin.com/in/aalyaan/",
  },
  {
    name: "Camden Wright",
    role: "Technical Fellowship Lead",
    email: "camden_wright@brown.edu",
  },
  {
    name: "Isaac Bitran",
    role: "Communications and Programming Lead",
    email: "isaac_bitran@brown.edu",
  },
  {
    name: "Solly Goluboff-Schragger",
    role: "AI and Society Workshops Project Lead",
    email: "soloman_goluboff-schragger@brown.edu",
    linkedin: "https://www.linkedin.com/in/solomongs/",
  },
  {
    name: "Tyrone Serapio",
    role: "Technical Fellowship Lead",
    email: "tyrone_kirk_serapio@brown.edu",
    linkedin: "https://www.linkedin.com/in/tyroneserapio/",
  },
]

export const executiveBoard: Person[] = [
  {
    name: "Garrett Xu",
    role: "Director of AI Safety Fundamentals Fellowship",
    email: "garret_xu@brown.edu",
    linkedin: "https://www.linkedin.com/in/garrett-xu-575420228/",
  },
  {
    name: "Raen Kao",
    role: "Director of Technical Governance Fellowship",
    email: "raen_kao@brown.edu",
    linkedin: "https://www.linkedin.com/in/raenkao/",
  },
  {
    name: "Roger Mao",
    role: "Director of Technical Research Fellowship and Programming",
    email: "roger_mao@brown.edu",
    linkedin: "https://www.linkedin.com/in/roger-y-mao/",
  },
]

/** Everyone, in page order — the single source of truth for person lookups. */
export const allPeople: Person[] = [...leadershipTeam, ...executiveBoard]

export function findPerson(name: string): Person | undefined {
  return allPeople.find((person) => person.name === name)
}
