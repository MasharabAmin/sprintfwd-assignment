import { DEV_BASE_URL, END_POINTS } from "@/constants/path"
import { createUrl } from "@/utils"

const BASE_URL = import.meta.env.API_URL || DEV_BASE_URL
export const fetchTeams = async () => {
  const args: string[] = [ BASE_URL, END_POINTS.TEAMS ]
  const teams = await fetch(createUrl(args))
  return await teams.json()
}