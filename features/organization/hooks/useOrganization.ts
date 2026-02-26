import { useOrganizationStore } from "../store/organization.store";
import { Organization } from "../types/organization.type";

export const useOrganization = () => {
  const {
    currentOrganization,
    setCurrentOrganization,
    isLoading,
    setIsLoading,
  } = useOrganizationStore();
  const fetchCurrentOrganization = async () => {
    const dataFake: Organization = {
      id: 1,
      name: "Công ty TNHH ABC",
      status: "active",
      address: "123 Đường ABC, Quận 1, TP.HCM",
      taxCode: "0123456789",
      createdAt: "2024-01-01T00:00:00Z",
    };
    setCurrentOrganization(dataFake);
  };
  return {
    currentOrganization,
    fetchCurrentOrganization,
    isLoading,
  };
};
