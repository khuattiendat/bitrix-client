import { create } from "zustand";
interface UserFormState {
  fullName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  organizations: { id: number; organizationRole: string }[];
  error: boolean;
  setDataUser: (data: Partial<UserFormState>) => void;
  setDatarganizations: (
    organizations: { id: number; organizationRole: string }[],
  ) => void;
  setError: (error: boolean) => void;
}
const useUserForm = create<UserFormState>((set) => ({
  fullName: "",
  email: "",
  password: "",
  dateOfBirth: "",
  organizations: [],
  error: false,
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
  setError: (error: boolean) => {
    set((state: UserFormState) => ({
      ...state,
      error,
    }));
  },
}));
export default useUserForm;
