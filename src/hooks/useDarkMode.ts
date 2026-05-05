import { useState, useEffect } from "react";

const STORAGE_KEY = "budget-tracker-dark-mode";

export function useDarkMode() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) return saved === "true";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem(STORAGE_KEY, String(dark));
  }, [dark]);

  const toggle = () => setDark((d) => !d);

  return { dark, toggle };
}
