import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { PageTransition } from "@/components/common/PageTransition";
import { useScrollToTop } from "@/lib/navigation";

/**
 * In Next.js this becomes app/layout.tsx and <Outlet /> becomes {children}.
 */
export function RootLayout() {
  useScrollToTop();

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-soft focus:bg-accent focus:px-3 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main" className="flex-1">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
}
