import { create } from "zustand";
import { persist } from "zustand/middleware";
import { OrganizationStore } from "../types/organization.type";

export const useOrganizationStore = create<OrganizationStore>()(
  persist(
    (set) => ({
      currentOrganization: null,
      isLoading: false,
      setCurrentOrganization: (organization) =>
        set({ currentOrganization: organization }),
      setIsLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: "organization-storage",
      partialize: (state) => ({
        currentOrganization: state.currentOrganization,
      }),
    },
  ),
);
