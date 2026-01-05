// features/auth/store/auth.store.ts
import { create } from "zustand";
import { User } from "../types/auth.type";

export const useAuthStore = create((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  logout: () => set({ user: null }),
}));
