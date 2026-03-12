export const BASE_URL_SERVER =
  process.env.BASE_URL_SERVER || "http://localhost:3000";
// public routes that don't require authentication
export const PUBLIC_ROUTES = [
  "/login",
  "/403",
  "/404",
  "/500",
  "/forgot-password",
  "/reset-password",
];
