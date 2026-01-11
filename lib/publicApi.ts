import { BASE_URL_SERVER } from "@/shared/const";
import axios from "axios";

export const publicApi = axios.create({
  baseURL: BASE_URL_SERVER,
  withCredentials: true,
});
