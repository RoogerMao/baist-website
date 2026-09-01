import type { Fellowship } from "./fellowship-accordion"

export const fellowships: Fellowship[] = [
  {
    value: "technical-ai-safety-research",
    icon: "/fellowships/technical.svg",
    title: "Technical AI Safety Research Fellowship",
    schedule: "Tuesdays and Thursdays from 5:30 to 7:30 PM",
    authors: ["Camden Wright", "Roger Mao", "Tyrone Serapio"],
    description:
      "In addition to the arguments for and against AI safety, this fellowship covers the architecture and training of LLMs, before discussing how we can influence model behavior: clarifying model reasoning (interpretability), evaluations, and external safeguards.",
    topics: [
      "Neural Networks",
      "Transformers",
      "Post-Training",
      "Safety Evaluations and Benchmarks",
      "Interpretability",
      "Jailbreaking",
      "Model Security",
      "AI control",
    ],
    pastCurriculums: [
      {
        label: "Spring 2025",
        href: "https://vault.roger-mao.com/BAIST+Spring+2026+Technical+Fellowship+Resources/February+12th%2C+2026%E2%80%94AI+Safety%2C+Ethics%2C+and+Alignment",
      },
      {
        label: "Fall 2024",
        href: "https://brown-ai-safety-team.notion.site/BAIST-Technical-Program-Syllabus-Fall-2024-b75a037b1f4a42d68650af72ba28b07c",
      },
    ],
  },
]
