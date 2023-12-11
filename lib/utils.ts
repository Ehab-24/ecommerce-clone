import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function apiUrl(path: string) {
  return `${process.env.BASE_URI}${path}`
}