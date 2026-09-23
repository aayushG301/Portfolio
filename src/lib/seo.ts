/**
 * Minimal document-head handling for the Vite build.
 *
 * On migration this file is deleted — Next.js replaces it with the `metadata`
 * export in each route segment. Nothing else imports document directly, so the
 * SEO concepts you set up here map straight across.
 */
import { useEffect } from "react";

interface Meta {
  title: string;
  description?: string;
}

export function usePageMeta({ title, description }: Meta) {
  useEffect(() => {
    document.title = title;

    if (description) {
      let tag = document.querySelector('meta[name="description"]');

      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }

      tag.setAttribute("content", description);
    }
  }, [title, description]);
}
