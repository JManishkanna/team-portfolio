import { lazy, Suspense } from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { RootLayout } from "./components/layout/RootLayout";
import { PageSkeleton } from "./components/common/PageSkeleton";
import HomePage from "./pages/HomePage";
import { isAdminAuthenticated } from "./utils/adminAuth";

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
const LoginPage = lazy(() => import("./pages/LoginPage"));
const AdminLoginPage = lazy(() => import("./pages/AdminLoginPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function AdminGuard() {
  const location = useLocation();
  return isAdminAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate to="/ADMIN/login" replace state={{ from: location.pathname }} />
  );
}

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
          <Route path="login" element={<LoginPage />} />
          <Route path="admin/login" caseSensitive element={<AdminLoginPage />} />
          <Route path="ADMIN/login" caseSensitive element={<AdminLoginPage />} />
          <Route element={<AdminGuard />}>
            <Route path="admin/projects" element={<AdminProjectsPage />} />
            <Route path="admin" caseSensitive element={<AdminPage />} />
            <Route path="ADMIN" caseSensitive element={<AdminPage />} />
          </Route>
          <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
