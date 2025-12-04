import { useState, useMemo } from "react"

export function usePagination(data, itemsPerPage = 8) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(data.length / itemsPerPage)

  const currentData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    return data.slice(start, end)
  }, [data, currentPage, itemsPerPage])

  const next = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1)
  }

  const previous = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1)
  }

  const reset = () => {
    setCurrentPage(1)
  }

  return {
    currentData,
    currentPage,
    totalPages,
    next,
    previous,
    reset,
  }
}