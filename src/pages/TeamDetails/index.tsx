import { useEffect, useState } from "react"
import styles from "./TeamDetails.module.css"
import Card from "@/components/molecules/Card"
import { useParams } from "react-router-dom"
import { useAppContext } from "@/store/context"
import { fetchMembers } from "@/api/members"
import { MemberProps } from "@/interfaces/member.interface"
import { MESSAGES } from "@/constants/constants"
const TeamDetails = () => {
  const { membersData, setMembersData } = useAppContext()
  const { name } = useParams()
  const [ teamData, setTeamData ] = useState<MemberProps[]>([])

  useEffect(() => {
    if (!membersData.length) {
      const fetchData = async() => {
        try {
          const members = await fetchMembers()
          setMembersData(members)
        } catch(error) {
          alert(MESSAGES.ERROR)
        }
      }
      fetchData()
    }
    const filteredData = membersData.filter((member) => member.team.name === name)
    setTeamData(filteredData)
  }, [membersData, name])

  return (
    <div>
      <h3 className={styles.heading}>{name}</h3>
      <Card members={teamData} />
    </div>
  )
}

export default TeamDetails
