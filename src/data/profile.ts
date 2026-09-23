export const profile = {
  name: "Aayush Garg",
  shortName: "Aayush",
  role: "Full-Stack Developer",

  // Rotates in the hero. Keep each phrase short — they share one line.
  rotatingPhrases: ["scalable systems", "practical products", "backend services"],

  tagline:
    "I build backend systems that hold up under real load — async pipelines, secure APIs, and full-stack products shipped end to end, not just demoed.",

  location: "Ghaziabad, Uttar Pradesh, India",

  email: "aayushgarg301@gmail.com",

  resumeUrl: "/resume/resume.pdf",

  // One paragraph per array item — the About section renders each as its own <p>.
  about: [
    "I'm a Computer Science student and full-stack developer who gravitates toward the backend: authentication, job queues, database design, the parts of a system that don't show up in a screenshot but decide whether it survives contact with real users.",
    "My core stack is MERN — MongoDB, Express, React, Node — but the through-line across my projects is architecture, not framework choice: role-based authorization that's enforced once instead of scattered through controllers, background workers instead of requests that block, validation at the edge instead of scattered checks.",
    "I practice Data Structures & Algorithms in Java to keep that instinct for time and space complexity sharp, and I'm extending it into Docker and CI/CD with GitHub Actions — the discipline that gets code from a laptop to production without surprises.",
  ],

  education: {
    institution: "Ajay Kumar Garg Engineering College",
    degree: "B.Tech, Computer Science and Engineering",
    period: "Aug 2024 – May 2028",
    location: "Ghaziabad, India",
  },


  currentlyExploring: ["System Design", "Distributed Systems", "Docker & CI/CD", "AWS"],
} as const;
