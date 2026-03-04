"use client";

import { useAuth } from "@/features/auth";
import { useAuthStore } from "@/features/auth/store/auth.store";
import LoadingAuth from "@/shared/components/LoadingAuth";
import { PUBLIC_ROUTES } from "@/shared/const";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { fetchProfile, isLoading, user, isAuthenticated } = useAuth();
  const { orgId } = useAuthStore();

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  useEffect(() => {
    if (!isPublicRoute) {
      fetchProfile();
    }
  }, [isPublicRoute]);

  useEffect(() => {
    if (isLoading || isPublicRoute) return;

    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (!user) return;

    if (user.systemRole === "admin") {
      if (!pathname.startsWith("/admin")) {
        router.replace("/admin");
      }
    } else {
      if (!orgId) {
        router.replace("/login");
        return;
      }
      if (!pathname.startsWith(`/org/${orgId}`)) {
        router.replace(`/org/${orgId}`);
      }
    }
  }, [
    isLoading,
    isAuthenticated,
    user,
    orgId,
    isPublicRoute,
    pathname,
    router,
  ]);

  if (isPublicRoute) {
    return <>{children}</>;
  }

  if (isLoading || !user) {
    return <LoadingAuth />;
  }

  return <>{children}</>;
};

export default AuthProvider;
