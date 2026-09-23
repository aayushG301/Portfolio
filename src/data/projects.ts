import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "bulkflow",
    title: "BulkFlow",
    tagline: "Processes thousands of records without ever blocking a request",
    shortDescription:
      "Turns messy spreadsheets into clean, enriched data in the background — with retries, progress tracking, and zero timeouts.",
    description:
      "A B2B tool for processing bulk CSV and Excel uploads. Sales teams drop in thousands of contact rows; BulkFlow validates them, flags data-quality problems, enriches them with AI-generated industry classification, and hands back a cleaned file plus an error report — without ever blocking the request that started the job.",
    category: "Full Stack",
    featured: true,
    status: "building",
    year: "2026",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Redis",
      "BullMQ",
      "Docker",
    ],
    image: "/images/projects/bulkflow.png",
    links: {
      github: "https://github.com/aayushG301/BulkFlow",
    },

    problem:
      "Processing a 10,000-row spreadsheet inside an HTTP request is a dead end. The request times out, the user has no idea how far along the work is, and a single malformed row can take the whole batch down with it. Most student projects avoid this by keeping every operation small and synchronous.",

    solution:
      "Split the upload from the work. The API accepts the file, writes a job record, and returns immediately. Workers pull jobs off a Redis-backed queue, process rows in batches, and write progress back as they go. The client polls job status and shows real progress instead of an indefinite spinner.",

    architecture: {
      summary:
        "Every stage is independent. The API never processes rows, and the workers never talk to the browser.",
      flow: [
        { label: "Upload", note: "CSV / Excel accepted, parsed and staged" },
        { label: "API", note: "Creates job record, returns immediately" },
        { label: "Queue", note: "Redis + BullMQ, retries with backoff" },
        { label: "Worker", note: "Batch validation, cleaning, AI enrichment" },
        {
          label: "Database",
          note: "Row results and per-job progress counters",
        },
        {
          label: "Results",
          note: "Cleaned file plus an error report to download",
        },
      ],
    },

    features: [
      "Asynchronous background processing with a job queue",
      "Live job progress — processed, failed and remaining row counts",
      "Automatic retries with exponential backoff on transient failures",
      "Per-row error reporting so one bad row can't fail the batch",
      "AI enrichment for industry classification and data-quality flags",
      "Containerised with Docker for a reproducible local setup",
    ],

    decisions: [
      {
        title: "Queue instead of a long-running request",
        body: "A request that takes four minutes isn't a request, it's an outage waiting to happen. Moving the work behind BullMQ meant the API stayed fast and the job became something I could retry, inspect and resume.",
      },
      {
        title: "Row-level failure isolation",
        body: "Failures are recorded against individual rows rather than the job. A batch with 40 bad rows still produces 9,960 usable ones, and the user gets an error report explaining exactly what went wrong and where.",
      },
      {
        title: "Batch writes over per-row writes",
        body: "Writing each row as it finished hammered the database for no benefit. Batching writes and updating progress counters periodically cut database round-trips substantially.",
      },
    ],

    challenges: [
      "Reporting progress accurately for work happening in a separate process",
      "Making retries safe — a retried job must not duplicate rows it already wrote",
      "Keeping memory flat while streaming large files rather than loading them whole",
    ],

    learnings: [
      "Where the boundary between a web server and a worker actually belongs",
      "Why idempotency matters the moment you introduce retries",
      "How much of 'scalability' is really just refusing to do work synchronously",
    ],

    futureImprovements: [
      "Observability — structured logs and per-stage timing metrics",
      "Horizontal worker scaling with a shared job lease",
      "Scheduled and recurring imports",
    ],
  },

  {
    slug: "okla",
    title: "Okla",
    tagline: "Every course is a path, not a page.",
    shortDescription:
      "A production-grade LMS where the permission model is as rigorous as the UI — three roles, one authorization system, zero shortcuts.",
    description:
      "A MERN learning management system built backend-first. Students browse and enroll in courses, work through sections and lessons, and have their progress tracked; instructors manage their own curriculum; admins review and publish courses. Three roles, three dashboards, one authorization model.",
    category: "Full Stack",
    featured: true,
    status: "live",
    year: "2026",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Tailwind CSS",
      "Zod",
      "JWT",
    ],
    image: "/images/projects/okla.png",
    links: {
      github: "https://github.com/aayushG301/Okla",
      live: "https://okla-lms.netlify.app/",
    },

    problem:
      "An LMS looks like CRUD until you draw the permission matrix. A student can read a lesson but only inside a course they've enrolled in; an instructor can edit a course but only one they own; an admin can publish anything but shouldn't be able to impersonate enrollment. Getting that wrong is a security bug, not a styling bug.",

    solution:
      "Role-based authorization enforced in middleware rather than scattered through controllers, with every route validated by a Zod schema before it reaches business logic. The backend is organised per feature — each module carries its own model, validation, service, controller and routes.",

    architecture: {
      summary:
        "Feature-module backend, with a matching per-feature structure on the client.",
      flow: [
        { label: "Component", note: "Renders, holds no request logic" },
        { label: "Hook", note: "Owns loading, error and refetch state" },
        { label: "Feature API", note: "One module per feature, typed calls" },
        {
          label: "Express route",
          note: "Zod validation, then auth middleware",
        },
        { label: "Service", note: "Business rules, no HTTP knowledge" },
        { label: "MongoDB", note: "Mongoose models per feature" },
      ],
    },

    features: [
      "JWT authentication with hashed passwords and role-based route guards",
      "Course, section and lesson management with publish/unpublish review flow",
      "Enrollment, lesson completion and per-course progress tracking",
      "Reviews with rating aggregation",
      "Separate dashboards for student, instructor and admin",
    ],

    decisions: [
      {
        title: "Feature modules over layer folders",
        body: "Grouping by feature instead of by file type means everything a change touches sits in one directory. Adding reviews meant adding one folder, not editing five shared ones.",
      },
      {
        title: "Validation at the edge",
        body: "Zod schemas run in middleware and attach parsed output to the request. Controllers never re-check shapes, so the rules live in exactly one place per module.",
      },
    ],

    learnings: [
      "How to design an authorization model before writing the endpoints that need it",
      "That consistent response shapes make a frontend dramatically simpler to write",
    ],

    futureImprovements: [
      "Certificates on course completion",
      "Instructor analytics",
    ],
  },

  {
    slug: "flashmart",
    title: "FlashMart",
    tagline: "Countdown-driven sales that never lie about the time left",
    shortDescription:
      "A flash-sale storefront where the countdown is backed by the server, not the browser clock — so the sale is exactly as open as it claims to be.",
    description:
      "A full-stack flash sale storefront: promotional product drops that open and close on a timer, with countdown state kept honest against the server rather than the browser clock.",
    category: "Full Stack",
    featured: true,
    status: "live",
    year: "2025",
    technologies: ["React", "Node.js", "Express", "MongoDB", "REST API"],
    image: "/images/projects/flashmart.png",
    links: {
      github: "https://github.com/aayushG301/FlashSale",
      live: "https://flashmart-shop.netlify.app/",
    },

    problem:
      "Countdowns are deceptively hard. A timer driven purely by the client drifts, and a user with a skewed system clock can see a sale as open when the server says it's closed.",

    solution:
      "The server stays authoritative on sale windows; the client renders a countdown derived from a server timestamp and re-validates on the action that matters rather than trusting its own clock.",

    features: [
      "Countdown-driven sale windows with server-side validation",
      "Product catalogue and promotional banner management",
      "REST API with a consistent response envelope",
      "Responsive storefront layout",
    ],

    learnings: ["Why client-side time is never a source of truth"],
  },
];

/* ---------- Derived helpers. Nothing below needs editing. ---------- */

export const featuredProjects = projects.filter((p) => p.featured);

export const projectCategories = [
  "All",
  ...Array.from(new Set(projects.map((p) => p.category))),
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
