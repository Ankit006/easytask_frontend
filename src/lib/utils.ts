import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { io } from "socket.io-client";
import { backendUrl } from "@/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function resizeImage(url: string, width: number, height: number) {
  return `${url}?tr=w-${width},h-${height}`;
}

export function formatDate(date: string) {
  const dateArr = date.split("-");
  return `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`;
}

export const socket = io(backendUrl, { autoConnect: false });
