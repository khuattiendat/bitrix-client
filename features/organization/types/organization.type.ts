import { OrganizationMemberRole } from "@/shared/enums/organization.enum";
import { MetaData } from "@/shared/type/comon.type";

export interface Organization {
  id: number;
  name: string;
  status: "active" | "suspended";
  address?: string;
  taxCode?: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface AllOrganizationsResponse {
  data: {
    data: Organization[];
    meta: MetaData;
  };
}
export interface UserOrganization extends Organization {
  organizationRole: OrganizationMemberRole;
}
export interface CreateOrganizationRequest {
  name: string;
  taxCode: string;
  address: string;
}

export interface OrganizationStore {
  currentOrganization: UserOrganization | null;
  setCurrentOrganization: (organization: UserOrganization | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}
