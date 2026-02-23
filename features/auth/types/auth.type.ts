import { OrganizationMemberRole } from "@/shared/enums/organization.enum";

export interface LoginPayload {
  email: string;
  password: string;
}
export interface OrganizationUser {
  id: number;
  name: string;
  organizationRole: keyof typeof OrganizationMemberRole;
}
export interface User {
  id: string;
  email: string;
  fullName: string;
  dateOfBirth: string | null;
  systemRole: string;
  avatar?: string;
  organizations: OrganizationUser[];
}
export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setUser: (user: User) => void;
  setAuth: (user: User, accessToken: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}
export interface AuthResponse {
  data: {
    user: User;
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  };
}
export enum SYSTEM_ROLE {
  ADMIN = "admin",
  NONE = "none",
}
