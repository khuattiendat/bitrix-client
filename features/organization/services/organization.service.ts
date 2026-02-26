import { privateApi } from "@/lib";
import {
  AllOrganizationsResponse,
  CreateOrganizationRequest,
} from "../types/organization.type";

export const organizationService = {
  async getAllOrganizations(params: string) {
    const response = await privateApi.get<AllOrganizationsResponse>(
      `/api/organizations?${params}`,
    );
    return response.data.data;
  },
  async createOrganization(data: CreateOrganizationRequest) {
    const response = await privateApi.post("/api/organizations", data);
    return response.data.data;
  },
  async updateOrganization(id: number, data: CreateOrganizationRequest) {
    const response = await privateApi.put(`/api/organizations/${id}`, data);
    return response.data.data;
  },
  async deleteOrganization(id: number) {
    const response = await privateApi.delete(`/api/organizations/${id}`);
    return response.data.data;
  },
};
