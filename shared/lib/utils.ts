import clsx from "clsx";
import { ClassValue } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
export const convertDateToMoment = (
  dateString: string | null | undefined | moment.Moment,
): string => {
  if (!dateString) return "";
  return moment(dateString).format("YYYY-MM-DD");
};
