export type Theme = "light" | "dark";
export interface AppStore { theme: Theme; toggleTheme: () => void; setTheme: (theme: Theme) => void; }
