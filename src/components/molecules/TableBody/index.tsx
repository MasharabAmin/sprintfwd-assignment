import React from "react"
import Cell from "@/components/atoms/Cell"
import { useNavigate } from "react-router-dom"
import { getValueByPath } from "@/utils"
import { TableBodyProps } from "@/interfaces/tableBody.interface"

const TableBody: React.FC<TableBodyProps> = ({ data, columns }) => {
  const navigate = useNavigate()
  
  const handleCellClick = (name: string) => {
    navigate(`/members/${name}`)
  }

  return (
    <tbody>
      {data.map((row, rowIndex: number) => (
        <tr key={rowIndex}>
          {columns.map((column, colIndex: number) => (
            <Cell
              key={colIndex}
              title={column.label}
              onClick={handleCellClick}
              value={getValueByPath(column.name, row)}
            />
          ))}
        </tr>
      ))}
    </tbody>
  )
}

export default TableBody
