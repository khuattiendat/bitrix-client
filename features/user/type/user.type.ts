import { User } from "@/features/auth/types/auth.type";
import { MetaData } from "@/shared/type/comon.type";

export interface AllUsersResponse {
  data: {
    data: User[];
    meta: MetaData;
  };
}
