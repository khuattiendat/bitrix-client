import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthState, User } from "../types/auth.type";
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: true,
      orgId: null,
      setUser: (user: User) => {
        set({ user, isAuthenticated: true });
      },

      setAuth: (user, accessToken, orgId) =>
        set({
          user,
          accessToken: accessToken,
          orgId: orgId,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
        }),

      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: "auth-storage", // localStorage key
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
        orgId: state.orgId,
      }),
    },
  ),
);
