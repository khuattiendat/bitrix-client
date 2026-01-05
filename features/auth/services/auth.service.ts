// features/auth/services/auth.service.ts
import { api } from "@/shared/axios";
import { LoginPayload } from "../types/auth.type";

export const authService = {
  login: (data: LoginPayload) => api.post("/auth/login", data),

  logout: () => api.post("/auth/logout"),
};
