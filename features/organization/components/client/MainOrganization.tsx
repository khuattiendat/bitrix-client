"use client";
import { useAuth } from "@/features/auth";
import { useOrganization } from "../../hooks/useOrganization";

const MainOrganization = () => {
  const { currentOrganization } = useOrganization();
  console.log("currentOrganization", currentOrganization);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold mb-4">Main Organization Page</h1>
      <p className="text-gray-600">Welcome to {currentOrganization?.name}</p>
    </div>
  );
};
export default MainOrganization;
