# Portfolio — Aayush Garg

React + Vite + TypeScript + Tailwind + Motion. Content-driven, so adding a project
or a skill is a data edit, never a component edit.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run typecheck  # types only, no build
```

Node 18 or newer.

---

## Before you deploy — things to fill in

| What                                 | Where                                                                                    |
| ------------------------------------ | ---------------------------------------------------------------------------------------- |
| Your real email address              | `src/data/profile.ts` → `email`                                                          |
| Your resume PDF                      | already dropped in at `public/resume/resume.pdf` — replace when you have a newer version |
| Your Codeforces and CodeChef handles | `src/data/links.ts` → `codingProfiles` (currently placeholders)                          |
| Confirm your LeetCode URL            | `src/data/links.ts` → `codingProfiles`                                                   |
| Live demo links                      | `src/data/projects.ts` → each project's `links.live`                                     |
| Project screenshots                  | `public/images/projects/*` — set the matching `image` path in `src/data/projects.ts`     |
| Real domain                          | `index.html` → `<link rel="canonical">`                                                  |

Nothing else is a placeholder. Everything not listed above is real content.

All outbound links — GitHub, LeetCode, Codeforces, CodeChef, LinkedIn, email, resume — are
defined once in `src/data/links.ts`, grouped by what they're for. The homepage hero and
Contact section each pull only the one or two links that make sense in context; the full,
categorised list lives at `/links`.

---

## Adding things

### A skill

`src/data/skills.ts`. Adding Redis is one line:

```ts
{
  category: "Databases",
  items: ["MongoDB", "MySQL", "Redis"],   // <- just add it
}
```

A whole new category is one object. The UI reads whatever is in the array.

### A project

`src/data/projects.ts`. Copy an existing object, change the fields, save.
It appears in the grid, in the filters, and at `/projects/<slug>` automatically.

Set `image` to a file in `public/images/projects/` when a project has a screenshot.
The card shows a branded fallback until an image is available, so the layout stays
intact while a new project is being added.

Only these fields are required:

```
slug, title, tagline, shortDescription, description,
category, featured, status, year, technologies, links
```

**Every case-study field is optional.** Omit `challenges` and the "What was hard"
section doesn't render — no empty headings, no `undefined`. So a quick project can be
six lines, and BulkFlow can be a full write-up, using the same shape.

`category` is typed, so a typo is a compile error rather than a project that silently
vanishes from the filters. The filter list generates itself from the categories in use.

### An architecture diagram

Add `architecture.flow` to a project:

```ts
architecture: {
  summary: "One line on how the pieces relate.",
  flow: [
    { label: "Upload", note: "What happens here" },
    { label: "Queue",  note: "..." },
  ],
}
```

It renders as an animated vertical pipeline on the detail page. No SVG to draw.

### An achievement or a job

`src/data/achievements.ts` and `src/data/experience.ts`. Both sections hide themselves
when their array is empty, so there's never a hollow section waiting to be filled.

---

## Migrating to Next.js later

This was built so the migration is a weekend, not a rewrite. Three rules were followed:

1. **No component imports `react-router`.** They all import from `src/lib/navigation.tsx`.
2. **No `import.meta.env` anywhere.** Nothing Vite-specific leaks into application code.
3. **Content lives in `src/data/`**, which is plain TypeScript with no framework imports.

### What you actually change

| File                                   | Change                                                                                              |
| -------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `src/lib/navigation.tsx`               | `Link` → `next/link`, `useRouteParam` → `useParams` from `next/navigation`, delete `useScrollToTop` |
| `src/lib/seo.ts`                       | delete — replaced by each route's `metadata` export                                                 |
| `src/App.tsx`                          | delete — routes become folders                                                                      |
| `src/main.tsx`                         | delete — Next owns the entry point                                                                  |
| `src/layouts/RootLayout.tsx`           | becomes `app/layout.tsx`, `<Outlet />` becomes `{children}`                                         |
| `index.html`                           | `<head>` contents move into the root `metadata` export                                              |
| `vite.config.ts`, `tsconfig.node.json` | delete                                                                                              |

### Route mapping

```
/                  ->  app/page.tsx
/projects          ->  app/projects/page.tsx
/projects/:slug    ->  app/projects/[slug]/page.tsx
```

### Client component boundaries

These use state, effects or browser APIs, so they need `"use client"` at the top:

```
components/navigation/Navbar.tsx
components/common/ThemeToggle.tsx
components/common/Reveal.tsx
components/diagram/FlowDiagram.tsx
components/diagram/HeroPipeline.tsx
components/projects/ProjectFilters.tsx
sections/Hero.tsx
pages/ProjectsPage.tsx
hooks/*
```

Everything else — the sections, the cards, the data — can stay a server component
untouched. Tailwind config, `index.css`, the tokens and every animation carry over as-is.

### What you gain by migrating

Static generation of project pages via `generateStaticParams`, real per-page metadata,
and image optimisation. Those are the reasons to do it — worth being able to explain
in an interview, rather than "everyone uses Next.js."

---

## Design notes

- Colours are CSS variables in `src/index.css`, surfaced to Tailwind as `bg-paper`,
  `text-ink`, `text-muted`, `border-line`, `text-accent`. Change a theme in one place.
- Dark mode is a class on `<html>`, set before first paint by an inline script in
  `index.html`, so there's no flash of the wrong theme. Preference persists in
  `localStorage` and defaults to the OS setting.
- Motion is deliberate, not ambient: the hero pipeline and the architecture diagrams
  move because the movement explains something. `prefers-reduced-motion` is respected
  in both CSS and in every animated component via `usePrefersReducedMotion`.
- Accessibility floor: skip link, visible focus rings, `aria-pressed` on filters,
  labelled icon buttons, diagrams labelled for screen readers.

### A rule worth keeping in mind: `src/lib/navigation.tsx`

Every internal link goes through one `Link` component so routing behaves consistently:

- A path ending in a file extension (`/resume/resume.pdf`, `/images/x.png`) is rendered
  as a real `<a>` tag, so the browser loads it directly. If it went through the router
  instead, the app's own "page not found" screen would catch it — that was the original
  resume-link bug. If you add another downloadable file, this handles it automatically;
  you don't need to do anything special.
- A path with a `#` (`/#about`) scrolls to that section's `id` instead of resetting
  scroll to the top, via `useScrollToTop` in the same file. If a navbar anchor stops
  scrolling again, that hook is the first place to look.

## Deploying

Static output — `npm run build` produces `dist/`. On Vercel, Netlify or Cloudflare
Pages, set build command `npm run build` and output directory `dist`.

Because routing is client-side, add a rewrite so deep links work. Vercel — `vercel.json`:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

Netlify — `public/_redirects`:

```
/*  /index.html  200
```
