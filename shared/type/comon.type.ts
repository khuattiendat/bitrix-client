export type MetaData = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
export interface ThemeState {
  theme: "light" | "dark";
  showSidebar: boolean;
  toggleTheme: () => void;
  toggleSidebar: () => void;
}
