import Table from "@/components/organisms/Table"
import { MESSAGES, TeamColumns } from "@/constants/constants"
import styles from "./Team.module.css"
import { fetchTeams } from "@/api/teams"
import { CONSTANTS } from "@/constants/constants"
import { useAppContext } from "@/store/context"
import { useEffect, useState } from "react"
import Loading from "@/pages/Loading"

const Teams = () => {
  const { TeamData, setTeamData } = useAppContext()
  const [ isLoading, setLoader ] = useState<boolean>(false)

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        if (!TeamData.length) {
          setLoader(true)
        }
        const team = await fetchTeams()
        setTeamData(team)
        setLoader(false)
      } catch (error) {
        alert(MESSAGES.ERROR)
      }
    }
    fetchTeamData()
  }, [setTeamData])

  if (isLoading) {
    <Loading />
  }

  return (
    <div>
      <h3 className={styles.heading}>{CONSTANTS.TEAMS}</h3>
      <Table columns={TeamColumns} tableData={TeamData} itemsPerPage={5} />
    </div>
  )
}

export default Teams
