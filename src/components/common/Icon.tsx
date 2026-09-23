import { Github, Linkedin, Mail, Code2, ChefHat, Gauge, FileText } from "lucide-react";
import type { LinkIcon } from "@/types";

const map = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  leetcode: Code2,
  codechef: ChefHat,
  codeforces: Gauge,
  resume: FileText,
} satisfies Record<LinkIcon, typeof Github>;

export function SocialIcon({ name, className }: { name: LinkIcon; className?: string }) {
  const Component = map[name];

  return <Component className={className} strokeWidth={1.6} aria-hidden />;
}
