import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return isAdminAuthenticated() ? (_jsx(Outlet, {})) : (_jsx(Navigate, { to: "/ADMIN/login", replace: true, state: { from: location.pathname } }));
}
export default function App() {
    return (_jsx(Suspense, { fallback: _jsx(PageSkeleton, {}), children: _jsx(Routes, { children: _jsxs(Route, { element: _jsx(RootLayout, {}), children: [_jsx(Route, { index: true, element: _jsx(HomePage, {}) }), _jsx(Route, { path: "team", element: _jsx(TeamPage, {}) }), _jsx(Route, { path: "team/:slug", element: _jsx(DeveloperPortfolioPage, {}) }), _jsx(Route, { path: "team/:slug/projects", element: _jsx(DeveloperProjectsPage, {}) }), _jsx(Route, { path: "team/:slug/contact", element: _jsx(DeveloperContactPage, {}) }), _jsx(Route, { path: "projects", element: _jsx(ProjectsPage, {}) }), _jsx(Route, { path: "project/:slug", element: _jsx(ProjectDetailsPage, {}) }), _jsx(Route, { path: "skills", element: _jsx(SkillsPage, {}) }), _jsx(Route, { path: "achievements", element: _jsx(AchievementsPage, {}) }), _jsx(Route, { path: "contact", element: _jsx(ContactPage, {}) }), _jsx(Route, { path: "login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "admin/login", caseSensitive: true, element: _jsx(AdminLoginPage, {}) }), _jsx(Route, { path: "ADMIN/login", caseSensitive: true, element: _jsx(AdminLoginPage, {}) }), _jsxs(Route, { element: _jsx(AdminGuard, {}), children: [_jsx(Route, { path: "admin/projects", element: _jsx(AdminProjectsPage, {}) }), _jsx(Route, { path: "admin", caseSensitive: true, element: _jsx(AdminPage, {}) }), _jsx(Route, { path: "ADMIN", caseSensitive: true, element: _jsx(AdminPage, {}) })] }), _jsx(Route, { path: "404", element: _jsx(NotFoundPage, {}) }), _jsx(Route, { path: "*", element: _jsx(NotFoundPage, {}) })] }) }) }));
}
