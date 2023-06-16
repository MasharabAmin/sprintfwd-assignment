import React from "react"
import { TableHeadProps } from "@/interfaces/tableHead.interface"

const TableHead: React.FC<TableHeadProps> = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map((column, index: number) => (
          <th key={index}>{column.label}</th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHead
