import { User } from "@/features/auth/types/auth.type";
import { MetaData } from "@/shared/type/comon.type";

export interface AllUsersResponse {
  data: {
    data: User[];
    meta: MetaData;
  };
}
export interface CreateUserRequest {
  fullName: string;
  email: string;
  dateOfBirth: string;
  password: string;
  organizations: { id: number; organizationRole: string }[];
}
export interface CreateUserResponse {
  data: User;
  message: string;
  success: boolean;
}
