import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import App from "./App";
import { ErrorBoundary } from "./components/common/ErrorBoundary";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/globals.css";
const container = document.getElementById("root");
if (!container)
    throw new Error("Root container #root is missing from index.html");
createRoot(container).render(_jsx(StrictMode, { children: _jsx(MotionConfig, { reducedMotion: "user", children: _jsx(BrowserRouter, { children: _jsx(ErrorBoundary, { children: _jsx(App, {}) }) }) }) }));
