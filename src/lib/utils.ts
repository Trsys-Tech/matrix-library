import { ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMergeExtended = extendTailwindMerge({ prefix: "mtx-" });
export function cn(...inputs: ClassValue[]) {
  return twMergeExtended(clsx(inputs));
}
