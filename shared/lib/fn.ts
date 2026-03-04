import { OrganizationMemberRole } from "../enums/organization.enum";

export const OrganizationMemberRoleTextMap: Record<
  OrganizationMemberRole,
  string
> = {
  [OrganizationMemberRole.OWNER]: "Chủ sở hữu",
  [OrganizationMemberRole.ADMIN]: "Admin",
  [OrganizationMemberRole.PROJECT_MANAGER]: "Quản lý dự án",
  [OrganizationMemberRole.MEMNER]: "Thành viên",
  [OrganizationMemberRole.GUEST]: "Khách mời",
};
export const getUserRoleInOrganizationText = (
  role: OrganizationMemberRole,
): string => {
  return OrganizationMemberRoleTextMap[role] || "Thành viên";
};
