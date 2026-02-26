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
export enum OrganizationMemberRole {
  OWNER = "Chủ sở hữu", // Organization owner with full permissions
  ADMIN = "admin", // Organization admin with elevated permissions
  PROJECT_MANAGER = "Quản lý dự án", // Project manager with project-level permissions
  MEMBER = "Thành viên", // Regular member with standard permissions
  GUEST = "Khách", // Guest member with limited permissions
}
export interface CreateOrganizationRequest {
  name: string;
  taxCode: string;
  address: string;
}

export interface OrganizationStore {
  currentOrganization: Organization | null;
  setCurrentOrganization: (organization: Organization | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}
