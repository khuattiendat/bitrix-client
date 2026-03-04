"use client";

import { useAuth } from "@/features/auth";
import { SYSTEM_ROLE } from "@/features/auth/types/auth.type";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const AdminProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.systemRole !== SYSTEM_ROLE.ADMIN) {
      router.replace("/403");
      return;
    }
  }, [user, router]);

  return <>{children}</>;
};

export default AdminProvider;
