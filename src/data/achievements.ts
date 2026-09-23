import type { Achievement } from "@/types";

/**
 * Three real entries beat twelve filler certificates. If this array is empty,
 * the Achievements section removes itself from the page automatically.
 */
export const achievements: Achievement[] = [
  {
    title: "Shipped a production-grade LMS backend, solo",
    date: "2026",
    type: "milestone",
    description:
      "Designed and built a complete learning-management backend — authentication, course management, enrollments, progress tracking and reviews — as independent, self-contained feature modules rather than one tangled codebase.",
  },
  {
    title: "Replaced a blocking request with a real processing pipeline",
    date: "2026",
    type: "project",
    description:
      "Rebuilt a synchronous upload flow into a queue-and-worker architecture with retries and live progress reporting — the piece of system design most student projects skip entirely.",
  },
  {
    title: "Disciplined DSA practice in Java",
    organization: "LeetCode",
    date: "Ongoing",
    type: "milestone",
    description:
      "Consistent problem solving focused on constraint analysis and edge cases — choosing the right time/space trade-off deliberately, not just reaching for the first solution that passes.",
  },
];
