import { TeamProps } from "./team.interface"

export interface MemberProps {
  id: number
  first_name: string
  last_name: string
  email: string
  team: TeamProps
}
