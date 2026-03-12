import { privateApi, publicApi } from "@/lib";
import { LoginPayload } from "../types/auth.type";

export const authService = {
  async login(payload: LoginPayload) {
    const { data } = await publicApi.post("/api/auth/sign-in", { ...payload });
    return data;
  },

  async getProfile() {
    const { data } = await privateApi.get("/api/auth/profile");
    return data;
  },

  async logout() {
    return await privateApi.post("/api/auth/logout");
  },
  async forgotPassword(email: string) {
    const { data } = await publicApi.post("/api/auth/forgot-password", {
      email,
    });
    return data;
  },
  async resetPassword(token: string, newPassword: string) {
    const { data } = await publicApi.post("/api/auth/reset-password", {
      token,
      newPassword,
    });
    return data;
  },
};
