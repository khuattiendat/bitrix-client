"use client";

import { useAuth } from "@/features/auth";
import LoadingAuth from "@/shared/components/LoadingAuth";
import { SYSTEM_ROLE } from "@/features/auth/types/auth.type";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const AdminProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { isLoading, user, isAuthenticated, fetchProfile } = useAuth();

  // Fetch profile 1 lần duy nhất tại đây, không trong useAuth
  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (user?.systemRole !== SYSTEM_ROLE.ADMIN) {
      router.replace("/403");
      return;
    }
  }, [isLoading, isAuthenticated, user, router]);

  if (isLoading || !user) {
    return <LoadingAuth />;
  }

  return <>{children}</>;
};

export default AdminProvider;
