interface PaginationOptions {
  itemsPerPage: number
  totalItems: number
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

interface PaginationState {
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  totalPages: number
  startIndex: number
  endIndex: number
  goToPage: (page: number) => void
  nextPage: () => void
  prevPage: () => void
}

const usePagination = ({
  itemsPerPage,
  totalItems,
  currentPage,
  setCurrentPage,
}: PaginationOptions): PaginationState => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1)

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    endIndex,
    goToPage,
    nextPage,
    prevPage,
  }
}

export default usePagination
