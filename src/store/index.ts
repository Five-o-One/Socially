/** @file Persisted client-only application state. */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AppStore } from "@/types";

/**
 * Global Zustand store for client-only application state.
 *
 * Server state such as users, posts, follows, likes, comments,
 * sessions, and notifications is managed by TanStack Query.
 */
export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      theme: "light",

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "dark" ? "light" : "dark",
        })),

      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "socially-app",
    },
  ),
);
