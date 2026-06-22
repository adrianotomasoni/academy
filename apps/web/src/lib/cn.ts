import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Une classes Tailwind resolvendo conflitos. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
