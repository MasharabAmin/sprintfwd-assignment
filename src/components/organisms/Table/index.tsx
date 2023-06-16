import React, { useState } from "react"
import styles from "./Table.module.css"
import TableBody from "@/components/molecules/TableBody"
import TableHead from "@/components/molecules/TableHead"
import usePagination from "@/hooks/usePagination"
import Pagination from "@/components/molecules/Pagination"
import { TableProps } from "@/interfaces/table.interface"

const Table: React.FC<TableProps> = ({ tableData, columns }) => {
  const itemsPerPageOptions = [5, 10, 15, 20, 30, 50]
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0])

  const totalItems = tableData.length

  const { startIndex, endIndex, totalPages } = usePagination({
    itemsPerPage,
    totalItems,
    currentPage,
    setCurrentPage,
  })
  const paginatedData = tableData.slice(startIndex, endIndex + 1)
  return (
    <>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <TableHead columns={columns} />
          <TableBody data={paginatedData} columns={columns} />
        </table>
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        setItemsPerPage={setItemsPerPage}
        itemsPerPageOptions={itemsPerPageOptions}
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  )
}

export default Table
