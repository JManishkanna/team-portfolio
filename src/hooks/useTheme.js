import { useEffect, useState } from "react";

export const THEMES = ["default", "glass"];
const THEME_KEY = "team-vinsmokes.theme";

function getInitialTheme() {
  if (typeof window === "undefined") return "default";
  const saved = window.localStorage.getItem(THEME_KEY);
  return THEMES.includes(saved) ? saved : "default";
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = "dark";
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  function cycleTheme() {
    setTheme((current) => THEMES[(THEMES.indexOf(current) + 1) % THEMES.length]);
  }

  return { theme, cycleTheme };
}
