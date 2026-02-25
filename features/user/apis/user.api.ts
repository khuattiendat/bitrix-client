import useSWR from "swr";
import { userService } from "../services/user.service";

export const deleteUser = async (userId: number) => {
  return useSWR(`/api/users/${userId}`, async () => {
    await userService.deleteUser(userId);
  });
};
