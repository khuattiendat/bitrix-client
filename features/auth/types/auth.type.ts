// features/auth/types/auth.type.ts
export interface LoginPayload {
  email: string;
  password: string;
}
export interface User {
  id: string;
  name: string;
  email: string;
}
