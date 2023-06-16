import React from "react"
import { CONSTANTS } from "@/constants/constants"

export interface CellProps {
  value: string
  title: string
  onClick: (e: string) => void
}

const Cell: React.FC<CellProps> = ({ value, title, onClick }) => {
  return (
    <td
      onClick={() => (title === CONSTANTS.TEAM ? onClick(value) : {})}
      style={
        title === CONSTANTS.TEAM
          ? {
              color: "blue",
              cursor: "pointer",
            }
          : {}
      }
    >
      {value}
    </td>
  )
}

export default Cell
