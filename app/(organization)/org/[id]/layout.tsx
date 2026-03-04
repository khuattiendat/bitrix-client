"use client";
import OrganizationProvider from "@/middleware/OrganizationProvider";
import HeaderHome from "@/shared/components/HeaderHome";
import IconRail from "@/shared/components/IconRail";
import LeftSidebar from "@/shared/components/LeftSidebar";

const LayoutOrganization = ({ children }: { children: React.ReactNode }) => {
  return (
    <OrganizationProvider>
      <div
        className="flex flex-col h-screen overflow-hidden bg-[#f5f6f8]"
        style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
      >
        <HeaderHome />
        <div className="flex flex-1 overflow-hidden">
          <LeftSidebar />
          {children}
          <IconRail />
        </div>
      </div>
    </OrganizationProvider>
  );
};
export default LayoutOrganization;
