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
    name: "Jay Maroney",
    role: "Leadership Team",
    email: "jay_maroney@brown.edu",
    linkedin: "https://www.linkedin.com/in/james-maroney-797b30304/",
  },
  {
    name: "Solly Goluboff-Schragger",
    role: "Leadership Team",
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
    photo: "/people/garrett-xu.webp",
    role: "Director of AI Safety Fundamentals Fellowship",
    email: "garret_xu@brown.edu",
    linkedin: "https://www.linkedin.com/in/garrett-xu-575420228/",
    calendly: "https://calendly.com/garrett-xu",
  },
  {
    name: "Raen Kao",
    photo: "/people/raen-kao.webp",
    role: "Director of Technical Governance Fellowship",
    email: "raen_kao@brown.edu",
    linkedin: "https://www.linkedin.com/in/raenkao/",
    bookingNote: "To speak with Raen, please send an email!",
  },
  {
    name: "Roger Mao",
    photo: "/people/roger-mao.webp",
    role: "Director of Technical Research Fellowship and Programming",
    email: "roger_mao@brown.edu",
    linkedin: "https://www.linkedin.com/in/roger-y-mao/",
    calendly: "https://calendly.com/rogermao2019/30min",
  },
]

/** Everyone, in page order — the single source of truth for person lookups. */
export const allPeople: Person[] = [...leadershipTeam, ...executiveBoard]

export function findPerson(name: string): Person | undefined {
  return allPeople.find((person) => person.name === name)
}
