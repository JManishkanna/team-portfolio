import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../navigation/Navbar";
import { Footer } from "../navigation/Footer";
import { ScrollProgress } from "../navigation/ScrollProgress";

/**
 * App shell: skip link, fixed navbar, animated page outlet, footer.
 * Nested URLs render inside `main`, so deep links like /team/manish/projects
 * keep the same chrome and remount only the page body.
 */
export function RootLayout() {
  const location = useLocation();

  // New page = new scroll position, but never fight an in-page hash target.
  useEffect(() => {
    if (location.hash) return;
    globalThis.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname, location.hash]);

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2.5 focus:font-semibold focus:text-lime"
      >
        Skip to main content
      </a>

      <ScrollProgress />
      <Navbar />

      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location.pathname}
          id="main-content"
          tabIndex={-1}
          className="flex-1 outline-none"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: [0.22, 0.68, 0.32, 1] }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
}
