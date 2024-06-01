import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const youtubeParser = (url: string) => {
  const regExp =
    /.*(?:youtu.be\/|(?:youtube.com\/live\/)|(?:youtube.com\/shorts\/)|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
  let match = url.match(regExp);
  return match && match[1].length == 11 ? match[1] : false;
};
