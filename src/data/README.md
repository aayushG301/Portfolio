# Editing your content

Everything that appears on the site lives in this folder as plain data. Edit
a file, save, and the site updates — no component code to touch, ever.

| To change...                          | Edit this                              |
| -------------------------------------- | --------------------------------------- |
| Name, tagline, bio, education          | `profile.ts`                            |
| Resume                                 | replace `public/resume/resume.pdf` with your new file, **keep the same filename** |
| Skills                                 | `skills.ts`                             |
| Projects (add / edit / remove)         | `projects.ts`                           |
| Achievements                           | `achievements.ts`                       |
| Work / education timeline              | `experience.ts`                         |
| GitHub, LinkedIn, LeetCode, Codeforces, CodeChef, email | `links.ts`             |

## The two patterns worth knowing

**Adding something is copying an existing entry and changing the text.**
Every array in this folder (`skills`, `projects`, `achievements`,
`experience`, the groups in `links.ts`) is a plain TypeScript array of
objects. Duplicate one entry, edit its fields, save — it appears on the
site in the right place automatically. No entry needs to be deleted to add
another.

**Optional fields disappear cleanly.** On a `projects.ts` entry, everything
past `technologies` and `links` (`problem`, `architecture`, `challenges`,
`learnings`, `futureImprovements`, …) is optional. Leave one out and that
section of the case-study page simply isn't rendered — no empty heading, no
placeholder text. So a two-line project and a full BulkFlow-style write-up
use the exact same shape.

## New resume, step by step

1. Export the new PDF as `resume.pdf`.
2. Drop it into `public/resume/`, replacing the old one.
3. That's it — `profile.ts` already points at `/resume/resume.pdf`, so
   nothing else needs to change.

If you ever *do* rename the file, update `resumeUrl` in `profile.ts` to
match.
