import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function resizeImage(url: string, width: number, height: number) {
  return `${url}?tr=w-${width},h-${height}`;
}
