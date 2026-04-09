import React, { useMemo } from 'react';
import { ChevronLeft, ChevronRight, ThreeDots } from 'react-bootstrap-icons';

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
}

export const InitialPaginationData = { total: 0, page: 1, pageSize: 5 };

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50],
}) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  const paginationRange = useMemo(() => {
    const siblingCount = 1;
    const totalPageNumbers = 7;

    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, 'DOTS', totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      );
      return [1, 'DOTS', ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [1, 'DOTS', ...middleRange, 'DOTS', totalPages];
    }
  }, [totalPages, currentPage]);

  if (currentPage === 0 || !paginationRange || paginationRange.length < 2) {
    return (
        <div className="d-flex justify-content-between align-items-center mt-4 px-2 text-muted-custom">
             <small>Showing all {totalCount} records</small>
        </div>
    );
  }

  return (
    <div className="d-flex flex-wrap justify-content-between align-items-center mt-4 gap-3 px-2">
      <div className="d-flex align-items-center gap-2 glass-panel px-3 py-2 rounded-pill">
        <span className="small fw-bold text-muted-custom">Show:</span>
        <select
          className="form-select form-select-sm bg-transparent border-0 text-main fw-bold shadow-none p-0 pe-4"
          style={{ width: 'auto', cursor: 'pointer' }}
          value={pageSize}
          onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size} className="bg-dark text-white">
              {size}
            </option>
          ))}
        </select>
      </div>

      <nav className="d-flex align-items-center gap-2">
        <button
          className={`btn glass-panel p-2 rounded-3 border-0 transition-all ${currentPage === 1 ? 'opacity-25' : 'hover-effect'}`}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={14} className="text-main" />
        </button>

        <div className="d-flex gap-1 align-items-center px-2 py-1 glass-panel rounded-3">
          {paginationRange.map((pageNumber, index) => {
            if (pageNumber === 'DOTS') {
              return <ThreeDots key={index} size={14} className="text-muted-custom px-1" />;
            }

            const isActive = pageNumber === currentPage;
            return (
              <button
                key={index}
                className={`btn btn-sm border-0 rounded-2 fw-bold transition-all ${
                  isActive ? 'btn-glass-primary shadow-sm' : 'text-muted-custom hover-effect'
                }`}
                style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onClick={() => onPageChange(Number(pageNumber))}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>

        <button
          className={`btn glass-panel p-2 rounded-3 border-0 transition-all ${currentPage === totalPages ? 'opacity-25' : 'hover-effect'}`}
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={14} className="text-main" />
        </button>
      </nav>

      <div className="text-muted-custom small fw-bold d-none d-md-block">
        Page <span className="text-main">{currentPage}</span> of {totalPages}
      </div>
    </div>
  );
};

export default Pagination;
