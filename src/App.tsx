import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { RootLayout } from "./components/layout/RootLayout";
import { PageSkeleton } from "./components/common/PageSkeleton";
import HomePage from "./pages/HomePage";

// Home and 404 stay in the entry chunk so the first paint and bad-slug fallback
// never wait on a second request. Everything else code-splits per route.
const TeamPage = lazy(() => import("./pages/TeamPage"));
const DeveloperPortfolioPage = lazy(() => import("./pages/DeveloperPortfolioPage"));
const DeveloperProjectsPage = lazy(() => import("./pages/DeveloperProjectsPage"));
const DeveloperContactPage = lazy(() => import("./pages/DeveloperContactPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ProjectDetailsPage = lazy(() => import("./pages/ProjectDetailsPage"));
const SkillsPage = lazy(() => import("./pages/SkillsPage"));
const AchievementsPage = lazy(() => import("./pages/AchievementsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AdminProjectsPage = lazy(() => import("./pages/AdminProjectsPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

export default function App() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="team" element={<TeamPage />} />

          {/* Individual developer portfolios — one reusable component, data-driven. */}
          <Route path="team/:slug" element={<DeveloperPortfolioPage />} />
          <Route path="team/:slug/projects" element={<DeveloperProjectsPage />} />
          <Route path="team/:slug/contact" element={<DeveloperContactPage />} />

          <Route path="projects" element={<ProjectsPage />} />
          <Route path="project/:slug" element={<ProjectDetailsPage />} />
          <Route path="skills" element={<SkillsPage />} />
          <Route path="achievements" element={<AchievementsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="admin/projects" element={<AdminProjectsPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
