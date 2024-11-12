import React, { useState } from "react";
import CustomModal from "./CustomModal";
import "./Table.css"; // Importing external CSS for styling

interface Header {
    viewName: string;
    fieldName: string;
}

interface TableData<T> {
    [key: string]: T; // for supporting dynamic fields in each row
}

export interface IOperations {
    isEdit: boolean;
    isDelete: boolean;
}

export interface ITableData<T> {
    data?: TableData<T>[]; // The actual data
    headers?: Header[]; // The table headers
    operations?: IOperations;
    type?: string
}
export interface ITableProps<T> {
    data: ITableData<T>;
    onEdit: (rowData: TableData<T>) => void; // Callback function for editing
    onDelete: (rowData: TableData<T>) => void; // Callback function for deleting
}

const Table: React.FC<ITableProps<any>> = ({ data, onEdit, onDelete }: ITableProps<any>) => {
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const [showModal, setShowModal] = useState(false);
    const [selectedData, setSelectedData] = useState<any>(null);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = (data: any) => {
        if (data) {
            onDelete(data)
        }
        setShowModal(false)
        return setSelectedData(null)
    };

    // Helper function to get nested value
    const getNestedValue = (obj: any, path: string): any => {
        return path.split(".").reduce((acc, part) => acc && acc[part], obj);
    };

    // Handle sorting
    const handleSort = (key: string) => {
        let direction = "ascending";
        if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }
        setSortConfig({ key, direction });
    };

    // Sorting the data based on current sort configuration
    const sortedData = React.useMemo(() => {
        if (!sortConfig) return data?.data || [];
        return [...(data?.data || [])].sort((a, b) => {
            const aValue = getNestedValue(a, sortConfig.key);
            const bValue = getNestedValue(b, sortConfig.key);
            if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
            return 0;
        });
    }, [data, sortConfig]);

    // Filter the data based on search query
    const filteredData = sortedData.filter((item: any) =>
        data?.headers?.some((header: any) =>
            getNestedValue(item, header.fieldName)?.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    return (
        <div className="container mt-3">
            <div className="d-flex mb-3">
                <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: "250px" }} // Custom style for search bar
                />
            </div>
            <table className="table table-striped table-hover">
                <thead className="thead-dark">
                    <tr>
                        {data?.headers?.map((header, index) => (
                            <th
                                scope="col"
                                key={`${header.viewName}-${header.fieldName}-${index}`}
                                onClick={() => handleSort(header.fieldName)}
                                style={{ cursor: "pointer" }}
                            >
                                {header?.viewName}
                                {sortConfig?.key === header.fieldName ? (
                                    sortConfig.direction === "ascending" ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-arrow-up"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-arrow-down"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"
                                            />
                                        </svg>
                                    )
                                ) : null}
                            </th>
                        ))}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((rowData, rowIndex) => (
                        <tr key={`row-${rowIndex}`}>
                            {data?.headers?.map((header, colIndex) => (
                                <td key={`${header.viewName}-${header.fieldName}-${colIndex}`}>
                                    {getNestedValue(rowData, header?.fieldName)}
                                </td>
                            ))}
                            <td>
                                {data?.operations?.isEdit && (
                                    <button
                                        className="btn btn-sm btn-outline-primary edit-btn me-2"
                                        onClick={() => onEdit(rowData)}
                                        title="Edit"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-pencil-square"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M12.146 0l3.708 3.708a1 1 0 0 1 0 1.414l-7.15 7.149a1 1 0 0 1-.553.293l-4.056 1.022a1 1 0 0 1-1.215-1.215l1.022-4.056a1 1 0 0 1 .293-.553L12.146 0zM11.207 2.793l-6.32 6.32-1.023 4.026 4.025-1.022 6.321-6.321L11.207 2.793z"
                                            />
                                        </svg>
                                    </button>
                                )}
                                {data?.operations?.isDelete && (
                                    <button
                                        className="btn btn-sm btn-outline-danger delete-btn"
                                        onClick={() => {
                                            setSelectedData(rowData)
                                            handleShowModal()
                                        }}
                                        title="Delete"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                        </svg>
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <CustomModal
                show={showModal}
                onHide={(data) => handleCloseModal(data)}
                title={`Delete ${data.type}`}
                data={selectedData} id={"Delete " + data.type} >
                <p>Are you sure you want to delete this {selectedData?.name} This action cannot be undone.</p>
            </CustomModal>
        </div >
    );
};

export default Table;
