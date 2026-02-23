import { create } from "zustand";
interface UserFormState {
  fullName?: string;
  email?: string;
  dateOfBirth?: string;
  organizations?: { id: number; organizationRole: string }[];
  setDataUser: (data: Partial<UserFormState>) => void;
  setDatarganizations: (
    organizations: { id: number; organizationRole: string }[],
  ) => void;
}
const useUserForm = create<UserFormState>((set) => ({
  fullName: "",
  email: "",
  dateOfBirth: "",
  organizations: [],
  setDataUser: (data: Partial<UserFormState>) => {
    set((state: UserFormState) => ({
      ...state,
      ...data,
    }));
  },
  setDatarganizations: (
    organizations: { id: number; organizationRole: string }[],
  ) => {
    set((state: UserFormState) => ({
      ...state,
      organizations,
    }));
  },
}));
export default useUserForm;
