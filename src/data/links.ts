import type { SocialLink } from "@/types";
import { profile } from "./profile";


export const codingProfiles: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/aayushG301",
    icon: "github",
    description: "Source for every project on this site.",
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/AayushGarg301/",
    icon: "leetcode",
    description: "Data structures and algorithms practice.",
  },
  {
    label: "Codeforces",
    href: "https://codeforces.com/profile/aayushgarg301",
    icon: "codeforces",
    description: "Competitive programming contest history.",
  },
  {
    label: "CodeChef",
    href: "https://www.codechef.com/users/aayush_301",
    icon: "codechef",
    description: "Competitive programming contest history.",
  },
];

/** Where to see the professional record. */
export const professionalLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/aayushgarg-tech/",
    icon: "linkedin",
    description: "Education, and a place to connect professionally.",
  },
];

/** How to actually reach the person — used by the homepage Contact section. */
export const contactLinks: SocialLink[] = [
  {
    label: "Email (aayushgarg301@gmail.com)",
    href: `mailto:${profile.email}`,
    icon: "mail",
    description: "The fastest way to reach me directly.",
  },
];

export const resumeLink: SocialLink = {
  label: "Resume",
  href: profile.resumeUrl,
  icon: "resume",
  description: "One-page PDF — education, skills and project summaries.",
};
