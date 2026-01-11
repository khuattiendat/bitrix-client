import axios from "axios";
import { publicApi } from "./publicApi";
import { BASE_URL_SERVER } from "@/shared/const";

export const privateApi = axios.create({
  baseURL: BASE_URL_SERVER,
  withCredentials: true,
});

let isRefreshing = false;

let queue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}[] = [];

const processQueue = (error: any) => {
  queue.forEach((p) => (error ? p.reject(error) : p.resolve()));
  queue = [];
};

privateApi.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      window.location.href = "/login";
      return config;
    }

    if (accessToken) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

privateApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh")
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject });
        }).then(() => privateApi(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await publicApi.post("/api/auth/refresh-tokens", {
          refreshToken: localStorage.getItem("refreshToken"),
        });
        const { accessToken, refreshToken } = response.data?.data?.tokens;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        processQueue(null);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return privateApi(originalRequest);
      } catch (err) {
        processQueue(err);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
