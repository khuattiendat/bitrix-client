import axios from "axios";
import { BASE_URL_SERVER } from "./const";
export const api = axios.create({
  baseURL: `${BASE_URL_SERVER}/api`,
  withCredentials: true,
});
