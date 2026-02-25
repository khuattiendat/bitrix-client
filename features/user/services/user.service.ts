import { privateApi } from "@/lib";
import {
  AllUsersResponse,
  CreateUserRequest,
  CreateUserResponse,
  FindOneUserResponse,
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
  async updateUser(userId: number, data: CreateUserRequest) {
    const response = await privateApi.put(`/api/users/${userId}`, data);
    return response.data;
  },
  async findOneUser(userId: number) {
    console.log(`Fetching user with ID: ${userId}`);

    const response = await privateApi.get<FindOneUserResponse>(
      `/api/users/${userId}`,
    );
    return response.data.data;
  },
};
