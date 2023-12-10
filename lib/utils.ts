import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function apiUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_API_URL}/${path}`;
}

export const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
