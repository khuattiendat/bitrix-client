"use client";
import { useAuth } from "@/features/auth";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useOrganizationStore } from "@/features/organization/store/organization.store";
import { userService } from "@/features/user/services/user.service";
import LoadingAuth from "@/shared/components/LoadingAuth";
import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import useSWR from "swr";

const OrganizationProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { user } = useAuth();
  const { orgId } = useAuthStore();
  const { setCurrentOrganization } = useOrganizationStore();

  const shouldFetch = !!user && !!orgId;

  const { data, error, isLoading } = useSWR(
    shouldFetch ? `org-${orgId}` : null,
    () => userService.checkOrganizationMembership(orgId!),
  );

  useEffect(() => {
    if (data) {
      setCurrentOrganization(data);
    }
  }, [data, setCurrentOrganization]);

  useEffect(() => {
    if (error || (!shouldFetch && user !== undefined)) {
      router.replace("/login");
    }
  }, [error, shouldFetch, user, router]);

  if (isLoading || !data) {
    return <LoadingAuth />;
  }

  return <>{children}</>;
};

export default OrganizationProvider;
