import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import App from "./App";
import { ErrorBoundary } from "./components/common/ErrorBoundary";
import "./styles/globals.css";

const container = document.getElementById("root");
if (!container) throw new Error("Root container #root is missing from index.html");

createRoot(container).render(
  <StrictMode>
    {/* reducedMotion="user" makes every Motion transform animation a no-op when
        the visitor asked for less motion — GSAP paths check the same query. */}
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </MotionConfig>
  </StrictMode>,
);
