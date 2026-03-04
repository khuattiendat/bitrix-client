import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ThemeState } from "../type/comon.type";

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "light",
      showSidebar: true,
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
      toggleSidebar: () =>
        set((state) => ({
          showSidebar: !state.showSidebar,
        })),
    }),
    {
      name: "theme-storage",
      partialize: (state) => {
        return {
          theme: state.theme,
          showSidebar: state.showSidebar,
        };
      },
    },
  ),
);
