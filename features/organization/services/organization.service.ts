import { privateApi } from "@/lib";
import { AllOrganizationsResponse } from "../types/organization.type";

export const organizationService = {
  async getAllOrganizations(params: string) {
    const response = await privateApi.get<AllOrganizationsResponse>(
      `/api/organizations?${params}`,
    );
    return response.data.data;
  },
};
