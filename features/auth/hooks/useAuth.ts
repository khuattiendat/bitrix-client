// features/auth/hooks/useAuth.ts
import { authService } from "../services/auth.service";
import { useAuthStore } from "../store/auth.store";
export const useAuth = () => {
  const setUser = useAuthStore((s: any) => s.setUser);

  const login = async (e: any) => {
    e.preventDefault();
    const res = await authService.login({
      email: "test@gmail.com",
      password: "123",
    });
    setUser(res.data.user);
  };

  return { login };
};
