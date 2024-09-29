import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const base_url = process.env.NODE_ENV=="development" ? process.env.BASE_URL : process.env.BASE_URL_PROD

export const parseTitleForUrl = (title:string) => {
  const res = title.replaceAll(" ","_").replaceAll("'","").replaceAll('"',"").replaceAll("!","").replaceAll("@","").replaceAll("#","").replaceAll("$","").replaceAll("%","").replaceAll("^","").replaceAll("&","").replaceAll("*","").replaceAll("(","").replaceAll(")","").replaceAll("+","").replaceAll("-","").replaceAll("=","")
  return res
}