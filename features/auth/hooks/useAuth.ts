"use client";

import { useEffect } from "react";
import { useAuthStore } from "../store/auth.store";
import { privateApi } from "@/lib";
import { authService } from "../services/auth.service";

export const useAuth = () => {
  const {
    user,
    accessToken,
    isAuthenticated,
    isLoading,
    setAuth,
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
  useEffect(() => {
    fetchProfile();
  }, []);
  return {
    user,
    accessToken,
    isAuthenticated,
    isLoading,
  };
};
