import { DEV_BASE_URL, END_POINTS } from "@/constants/path"
import { createUrl } from "@/utils"

const BASE_URL = import.meta.env.API_URL || DEV_BASE_URL
export const fetchMembers = async () => {
  const args: string[] = [ BASE_URL, END_POINTS.MEMBERS ]
  const members = await fetch(createUrl(args))
  return await members.json()
}