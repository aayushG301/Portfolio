/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // All colours resolve to CSS variables declared in src/index.css.
        // Change a theme in one place; every component follows.
        paper: "rgb(var(--c-paper) / <alpha-value>)",
        surface: "rgb(var(--c-surface) / <alpha-value>)",
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        muted: "rgb(var(--c-muted) / <alpha-value>)",
        accent: "rgb(var(--c-accent) / <alpha-value>)",
        "accent-soft": "rgb(var(--c-accent-soft) / <alpha-value>)",
        line: "rgb(var(--c-line) / <alpha-value>)",
      },
      fontFamily: {
        display: ["'Bricolage Grotesque Variable'", "'Bricolage Grotesque'", "Georgia", "sans-serif"],
        sans: ["'IBM Plex Sans'", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ["'IBM Plex Mono'", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      fontSize: {
        // Type scale, roughly a 1.25 ratio with a larger jump at display sizes.
        micro: ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.02em" }],
        meta: ["0.8125rem", { lineHeight: "1.25rem" }],
        body: ["1rem", { lineHeight: "1.65rem" }],
        lead: ["1.125rem", { lineHeight: "1.8rem" }],
        h3: ["1.375rem", { lineHeight: "1.85rem", letterSpacing: "-0.01em" }],
        h2: ["2rem", { lineHeight: "2.3rem", letterSpacing: "-0.02em" }],
        h1: ["clamp(2.5rem, 7vw, 4.5rem)", { lineHeight: "1.02", letterSpacing: "-0.035em" }],
      },
      maxWidth: {
        prose: "68ch",
        shell: "72rem",
      },
      borderRadius: {
        sharp: "2px",
        soft: "6px",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
