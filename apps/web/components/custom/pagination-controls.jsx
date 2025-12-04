import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function PaginationControls({ currentPage, totalPages, onNext, onPrevious }) {
  return (
    <div className="flex items-center gap-1">
      <Button
        variant="outline"
        size="icon"
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="h-9 w-16"
        aria-label="Previous Page"
          >
              <ChevronLeft className="h-4 w-4" />
             <p className="text-xs">Back</p>
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={onNext}
        disabled={currentPage >= totalPages || totalPages === 0}
        className="h-9 w-16"
        aria-label="Next Page"
          >
                <p className="text-xs">Next</p>
              <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}