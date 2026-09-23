import type { ExperienceEntry } from "@/types";

/**
 * Same shape works for independent work now and internships later —
 * add a new entry above this one when you land a role.
 */
export const experience: ExperienceEntry[] = [
  {
    role: "Independent projects",
    organization: "Self-directed",
    period: "2025 — Present",
    current: true,
    points: [
      "Designed and shipped three full-stack applications end to end, each with a deliberate bias toward backend architecture over surface-level CRUD.",
      "Worked deliberately with queues, background workers, authorization models and REST API design — the infrastructure decisions that don't show up in a UI screenshot.",
      "Containerised projects with Docker and automated checks with GitHub Actions, closing the gap between local development and something that actually ships.",
    ],
  },
  {
    role: "B.Tech, Computer Science and Engineering",
    organization: "Ajay Kumar Garg Engineering College",
    period: "Aug 2024 — May 2028",
    current: true,
    points: [
      "Coursework across data structures, algorithms, OOP and database systems.",
      "Algorithmic problem solving in Java alongside applied project work.",
    ],
  },
];
