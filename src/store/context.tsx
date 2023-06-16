import React, { createContext, useState, useContext, FC } from "react"
import { TodoProps } from "@/interfaces/todo.interface"
import { MemberProps } from "@/interfaces/member.interface"
import { TeamProps } from "@/interfaces/team.interface"

// Define the type for the context data
interface ContextType {
  membersData: MemberProps[]
  TeamData: TeamProps[]
  activeTasks: TodoProps[]
  completedTasks: TodoProps[]
  setActiveTasks: React.Dispatch<React.SetStateAction<TodoProps[]>>
  setCompletedTasks: React.Dispatch<React.SetStateAction<TodoProps[]>>
  setMembersData: React.Dispatch<React.SetStateAction<MemberProps[]>>
  setTeamData: React.Dispatch<React.SetStateAction<TeamProps[]>>
}

// Create the context
const AppContext = createContext<ContextType | undefined>(undefined)

// Create a custom hook for accessing the context
export const useAppContext = (): ContextType => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within a AppContextProvider")
  }
  return context
}

export const AppContextProvider: FC<any> = ({ children }) => {
  const [membersData, setMembersData] = useState<MemberProps[]>([])
  const [TeamData, setTeamData] = useState<TeamProps[]>([])
  const [activeTasks, setActiveTasks] = useState<TodoProps[]>([])
  const [completedTasks, setCompletedTasks] = useState<TodoProps[]>([])

  const contextValue: ContextType = {
    membersData,
    TeamData,
    completedTasks,
    activeTasks,
    setMembersData,
    setTeamData,
    setActiveTasks,
    setCompletedTasks,
  }

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}
