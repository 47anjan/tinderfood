import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const wait = (sec: number = 5) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Resolved after ${sec} seconds`);
    }, 1000 * sec);
  });
};
