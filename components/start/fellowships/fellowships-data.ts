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
    applyHref:
      "https://airtable.com/appzrK1CeY3gVhlS6/pagb9FfAVEHj4zask/form",
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
  {
    value: "ai-safety-fundamentals",
    icon: "/fellowships/fundamentals.svg",
    title: "AI Safety Fundamentals Fellowship",
    schedule: "Mondays from 5 to 7 PM",
    authors: ["Garrett Xu"],
    description:
      "This fellowship will help participants build mental models in understanding catastrophic AI risks on a [gears-level](https://www.lesswrong.com/w/gears-level) — that we should expect AI to be transformative and dangerously high risk, by default. As capabilities are compounding and as AI is increasingly used to speed up AI R&D, we may not be well-equipped to fully monitor, understand, and control AIs with misaligned goals in the near future. By the end of the fellowship, we hope to fast-track you into the field of AI safety and inspire you to contribute meaningfully on the most important problem of our time.",
    topics: ["AI Capabilities", "Forecasting", "Regulation", "AI Risks"],
    applyHref:
      "https://airtable.com/appJhIq5QoFTS5AMG/pagQW9BVCGj0vRdQ4/form",
    pastCurriculums: [],
  },
  {
    value: "technical-governance",
    icon: "/fellowships/governance.svg",
    title: "Technical Governance Fellowship",
    schedule: "Wednesdays from 5 to 7 PM",
    authors: ["Raen Kao"],
    description:
      "This fellowship will cover the range of AI risks, the strategies that different professionals take for mitigating those risks, and the legislative and geopolitical levers used to govern the development of frontier AI. Fellows learn about how to navigate evolving governance landscapes.",
    topics: [
      "Neural Networks",
      "Legal Definitions of AI",
      "Auditing & Benchmarking",
      "Supply Chains",
      "AI Economics",
      "US Government",
      "Chinese Government",
      "Policy Career Opportunities",
    ],
    applyHref:
      "https://airtable.com/appzrK1CeY3gVhlS6/pagQkMzNIuKblANby/form",
    pastCurriculums: [],
  },
]
