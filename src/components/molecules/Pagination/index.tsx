import React from "react"
import Button from "@/components/atoms/Button"
import styles from "./Pagination.module.css"
import usePagination from "@/hooks/usePagination"
import { CONSTANTS } from "@/constants/constants"

export interface PaginationProps {
  totalPages: number
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>
  itemsPerPageOptions: number[]
  totalItems: number
  itemsPerPage: number
}

const Pagination: React.FC<PaginationProps> = ({
  setItemsPerPage,
  itemsPerPageOptions,
  totalItems,
  currentPage,
  setCurrentPage,
  itemsPerPage,
}: PaginationProps) => {
  const { totalPages, goToPage, prevPage, nextPage } = usePagination({
    itemsPerPage,
    totalItems,
    currentPage,
    setCurrentPage,
  })

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedItemsPerPage = parseInt(event.target.value)
    setItemsPerPage(selectedItemsPerPage)
    setCurrentPage(1)
  }
  return (
    <div className={styles.pagination}>
      <select
        className='itemsPerPageSelector'
        onChange={handleItemsPerPageChange}
      >
        {itemsPerPageOptions.map((option: number) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <Button
        title={CONSTANTS.PREV}
        disabled={currentPage === 1}
        onClick={prevPage}
        className={styles.pageButton}
      />

      {Array.from({ length: totalPages }, (_, index) => (
        <Button
          title={String(index + 1)}
          key={index}
          onClick={() => goToPage(index + 1)}
          className={`${styles.pageButton} ${
            currentPage === index + 1 ? styles.active : ""
          }`}
        />
      ))}
      <Button
        title={CONSTANTS.NEXT}
        onClick={nextPage}
        className={styles.pageButton}
        disabled={currentPage === totalPages}
      />
    </div>
  )
}

export default Pagination
