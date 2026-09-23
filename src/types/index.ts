export type ProjectCategory = "Full Stack" | "Backend" | "Frontend" | "Systems";

export type ProjectStatus = "building" | "live" | "archived";

export interface FlowNode {
  label: string;
  note?: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  /** One or two sentences. Used on cards. */
  shortDescription: string;
  /** Longer prose. Used at the top of the detail page. */
  description: string;
  category: ProjectCategory;
  featured: boolean;
  status: ProjectStatus;
  year: string;
  technologies: string[];
  image?: string;
  gallery?: string[];
  links: {
    github?: string;
    live?: string;
    documentation?: string;
  };
  /** Case-study fields. Leave any of them out and the section simply won't render. */
  problem?: string;
  solution?: string;
  /** Renders as the animated architecture diagram on the detail page. */
  architecture?: {
    summary?: string;
    flow: FlowNode[];
  };
  features?: string[];
  decisions?: { title: string; body: string }[];
  challenges?: string[];
  learnings?: string[];
  futureImprovements?: string[];
  metrics?: { label: string; value: string }[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Achievement {
  title: string;
  organization?: string;
  date: string;
  description: string;
  type: "project" | "certification" | "competition" | "milestone";
  link?: string;
}

export interface ExperienceEntry {
  role: string;
  organization: string;
  period: string;
  current: boolean;
  points: string[];
}

export type LinkIcon =
  | "github"
  | "linkedin"
  | "leetcode"
  | "codeforces"
  | "codechef"
  | "mail"
  | "resume";

export interface SocialLink {
  label: string;
  href: string;
  /** Matches a key in components/common/Icon.tsx */
  icon: LinkIcon;
  /** Shown on the /links page only — what this link proves or is for. */
  description?: string;
}
