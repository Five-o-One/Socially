import { useEffect } from "react";
import { useAppStore } from "@/store";

/**
 * @component ThemeManager
 * @description Synchronizes the selected application theme with the document root.
 */
export function ThemeManager() {
  const theme = useAppStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return null;
}

export default ThemeManager;
