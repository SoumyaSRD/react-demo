import { useEffect, useState } from "react";
import './Pagination.css'; // Import the CSS file

export const InitialPaginationData = { total: 5, page: 1, pageSize: 5, diff: 5 };

const Pagination = ({ pagination, onPageChange }: any) => {
    const [currentPage, setCurrentPage] = useState(pagination.page);
    const [currentPageSize, setCurrentPageSize] = useState(pagination.pageSize);
    const [pageCount, setPageCount] = useState(Math.ceil(pagination.total / pagination.pageSize));
    const [currentDiff] = useState(pagination.diff);
    const [totalPages, setTotalPages] = useState(Math.ceil(pagination.total / pagination.diff));

    useEffect(() => {
        setPageCount(Math.ceil(pagination.total / pagination.pageSize));
        setTotalPages(Math.ceil(pagination.total / pagination.diff));
    }, [pagination.diff, pagination.pageSize, pagination.total]);

    const handlePageSizeChange = (event: any) => {
        const newSize = parseInt(event.target.value);
        setCurrentPageSize(newSize);
        setCurrentPage(1); // Reset to first page
        onPageChange({ page: 1, pageSize: newSize });
    };

    return (
        <div className="pagination-container">
            <div className="form-group">
                <label htmlFor="pageSizeSelect">Records per page:</label>
                <select id="pageSizeSelect" className="form-control-sm" value={currentPageSize} onChange={handlePageSizeChange}>
                    {Array.from(Array(totalPages).keys()).map((page, index) => (
                        <option key={(index + 1) * currentDiff} value={(index + 1) * currentDiff}>
                            {(index + 1) * currentDiff}
                        </option>
                    ))}
                </select>
            </div>
            <nav aria-label="Page navigation example">
                <ul className="pagination mb-0">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" aria-label="Previous" onClick={() => {
                            if (currentPage === 1) return;
                            onPageChange({ page: currentPage - 1, pageSize: currentPageSize });
                            setCurrentPage(currentPage - 1);
                        }}>
                            <span aria-hidden="true">«</span>
                        </button>
                    </li>
                    {Array.from(Array(pageCount).keys()).map((page, index) => (
                        <li key={`page${index}`} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => {
                                onPageChange({ page: index + 1, pageSize: currentPageSize });
                                setCurrentPage(index + 1);
                            }}>{page + 1}</button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === pageCount || pagination.total <= currentPageSize ? 'disabled' : ''}`}>
                        <button className="page-link" aria-label="Next" onClick={() => {
                            if (currentPage === pageCount) return;
                            onPageChange({ page: currentPage + 1, pageSize: currentPageSize });
                            setCurrentPage(currentPage + 1);
                        }}>
                            <span aria-hidden="true">»</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
