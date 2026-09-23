import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Skills } from "@/sections/Skills";
import { FeaturedProjects } from "@/sections/FeaturedProjects";
import { Experience } from "@/sections/Experience";
import { Achievements } from "@/sections/Achievements";
import { Contact } from "@/sections/Contact";
import { usePageMeta } from "@/lib/seo";
import { profile } from "@/data/profile";

export default function Home() {
  usePageMeta({
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
  });

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <FeaturedProjects />
      <Experience />
      <Achievements />
      <Contact />
    </>
  );
}
