"use client";

import { useAuthStore } from "../store/auth.store";
import { authService } from "../services/auth.service";

export const useAuth = () => {
  const {
    user,
    accessToken,
    isAuthenticated,
    isLoading,
    setLoading,
    setUser,
    logout,
  } = useAuthStore();

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data } = await authService.getProfile();
      setUser(data);
    } catch (error) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    accessToken,
    isAuthenticated,
    isLoading,
    logout,
    fetchProfile,
  };
};
