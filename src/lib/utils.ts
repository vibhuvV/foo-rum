import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function notImplemented() {
  window.alert("function not implemented");
}

export function setToLocalStorage(key: string, data: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(data));
  } catch {
    throw new Error("Unable to store the data");
  }
}

export function getFromLocalStorage<T = unknown>(key: string): T {
  try {
    const data = window.localStorage.getItem(key) ?? "null";
    return JSON.parse(data) as T;
  } catch {
    throw new Error("Unable to get the data");
  }
}

export function deleteFromLocalStorage(key: string) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    throw new Error("Unable to delete the data");
  }
}
