import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";

interface AppStore {
  theme: Theme;

  followingUserIds: string[];

  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;

  followUser: (userId: string) => void;
  unfollowUser: (userId: string) => void;
  isFollowingUser: (userId: string) => boolean;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      theme: "light",

      followingUserIds: [],

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "dark" ? "light" : "dark",
        })),

      setTheme: (theme) => set({ theme }),

      followUser: (userId) =>
        set((state) => {
          if (state.followingUserIds.includes(userId)) {
            return state;
          }

          return {
            followingUserIds: [...state.followingUserIds, userId],
          };
        }),

      unfollowUser: (userId) =>
        set((state) => ({
          followingUserIds: state.followingUserIds.filter(
            (id) => id !== userId,
          ),
        })),

      isFollowingUser: (userId) => get().followingUserIds.includes(userId),
    }),
    {
      name: "socially-app",
    },
  ),
);
