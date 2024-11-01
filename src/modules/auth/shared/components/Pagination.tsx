import { useEffect, useState } from "react";
export const InitialPaginationData = { total: 5, page: 1, pageSize: 5, diff: 5 }
const Pagination = ({ pagination, onPageChange }: any) => {
    const [currentPage, setCurrentPage] = useState(pagination.page)
    const [currentPageSize, setCurrentPageSize] = useState(pagination.pageSize)

    const [pageCount, setPageCount] = useState(Math.ceil(pagination.total / pagination.pageSize))
    const [currentDiff] = useState(pagination.diff)

    useEffect(() => {

        setPageCount(Math.ceil(pagination.total / currentPageSize))
        console.log('total', pagination.total)
    }, [pagination.total, pagination.pageSize])

    return (

        <nav aria-label="Page navigation example fixed-bottom">
            <ul className="pagination cursor-pointer">

                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`} >
                    <span className="page-link cursor-pointer" aria-label="Previous" onClick={() => {
                        if (currentPage === 1) return

                        onPageChange({ page: currentPage - 1 });
                        setCurrentPage(currentPage - 1)
                    }

                    }>
                        <span aria-hidden="true">&laquo;</span>
                    </span>
                </li>
                {Array.from(Array(Math.ceil(pageCount)).keys()).map((page, index) => {
                    return <li key={`page${index}`} className="page-item cursor-pointer"><span className={`page-link cursor-pointer ${(index + 1) === currentPage ? 'active' : ''}`} onClick={() => {
                        // if (index + 1 === pageCount) return
                        onPageChange({ page: index + 1 });

                        setCurrentPage(index + 1)
                    }}>{page + 1}</span></li>

                })}

                <li className={`page-item ${currentPage === pageCount || pagination.total <= currentPageSize ? 'disabled' : ''}`} >
                    <span className="page-link cursor-pointer" aria-label="Next" onClick={() => {
                        if (currentPage === pageCount) return

                        onPageChange({ page: currentPage + 1 });

                        setCurrentPage(currentPage + 1)
                    }}>
                        <span aria-hidden="true">&raquo;</span>
                    </span>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination