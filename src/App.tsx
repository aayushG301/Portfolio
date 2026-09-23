import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RootLayout } from "@/layouts/RootLayout";
import Home from "@/pages/Home";
import ProjectsPage from "@/pages/ProjectsPage";
import ProjectDetail from "@/pages/ProjectDetail";
import LinksPage from "@/pages/LinksPage";
import NotFound from "@/pages/NotFound";

/**
 * Routing is confined to this file and lib/navigation.tsx.
 * Migrating to the Next.js App Router means recreating this map as folders:
 *   /            -> app/page.tsx
 *   /projects    -> app/projects/page.tsx
 *   /projects/:s -> app/projects/[slug]/page.tsx
 *   /links       -> app/links/page.tsx
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/links" element={<LinksPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
