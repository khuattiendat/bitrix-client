"use client";

import { useAuth } from "@/features/auth";
import { use, useEffect } from "react";

export default function Home() {
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      if (user.systemRole === "admin") {
        window.location.href = "/admin";
      }
    }
  }, [user]);
  return <div className="">hello world</div>;
}
