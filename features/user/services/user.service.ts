import { privateApi } from "@/lib";
import {
  AllUsersResponse,
  CreateUserRequest,
  CreateUserResponse,
} from "../type/user.type";

export const userService = {
  async fetchUsers(params: string) {
    const response = await privateApi.get<AllUsersResponse>(
      `/api/users?${params}`,
    );
    return response.data.data;
  },
  async deleteUser(userId: number) {
    const response = await privateApi.delete(`/api/users/${userId}`);
    return response.data;
  },
  async createUser(data: CreateUserRequest) {
    const response = await privateApi.post<CreateUserResponse>(
      "/api/auth/sign-up",
      data,
    );
    return response.data;
  },
};
