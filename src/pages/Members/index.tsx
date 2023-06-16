import { useEffect, useState } from "react"
import Table from "@/components/organisms/Table"
import { MESSAGES, MembersColumn } from "@/constants/constants"
import styles from "./Members.module.css"
import { fetchMembers } from "@/api/members"
import { CONSTANTS } from "@/constants/constants"
import { useAppContext } from "@/store/context"
import Loading from "@/pages/Loading"

const Members = () => {
  const { membersData, setMembersData } = useAppContext()
  const [ isLoading, setLoader ] = useState<boolean>(false)
  useEffect(() => {
    const fetchMembersData = async () => {
      try {
        if (!membersData.length) {
          setLoader(true)
        }
        const members = await fetchMembers()
        setMembersData(members)
        setLoader(false)
      } catch(error) {
        alert(MESSAGES.ERROR)
      }
    }
    fetchMembersData()
  }, [setMembersData])

  if (isLoading) {
    <Loading />
  }

  return (
    <div>
      <h3 className={styles.heading}>{CONSTANTS.MEMBERS}</h3>
      <Table tableData={membersData} columns={MembersColumn} itemsPerPage={5} />
    </div>
  )
}

export default Members
