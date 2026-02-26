"use client";
import OrganizationProvider from "@/middleware/OrganizationProvider";

const LayoutOrganization = ({ children }: { children: React.ReactNode }) => {
  return <OrganizationProvider>{children}</OrganizationProvider>;
};
export default LayoutOrganization;
