import { User } from "@/features/auth/types/auth.type";
import { UserOrganization } from "@/features/organization/types/organization.type";
import { MetaData } from "@/shared/type/comon.type";
import { Dayjs } from "dayjs";

export interface AllUsersResponse {
  data: {
    data: User[];
    meta: MetaData;
  };
}
export interface OrganizationUser {
  id: number;
  name: string;
  organizationRole: string;
}
export interface CreateUserRequest {
  fullName: string;
  email: string;
  dateOfBirth: string | null | Dayjs;
  password: string;
  organizations: OrganizationUser[];
}
export type UpdateUserRequest = CreateUserRequest;
export interface CreateUserResponse {
  data: User;
  message: string;
  success: boolean;
}
export interface FindOneUserResponse {
  data: CreateUserRequest;
}
export interface CheckOrganizationMembershipResponse {
  data: UserOrganization;
}
