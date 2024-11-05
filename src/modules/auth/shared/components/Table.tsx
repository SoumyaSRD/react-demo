import React, { useState } from "react";

interface Header {
    viewName: string;
    fieldName: string;
}

interface TableData {
    [key: string]: any; // for supporting dynamic fields in each row
}

interface TableProps {
    data: {
        data: TableData[]; // The actual data
        headers: Header[]; // The table headers
    };
}

const Table: React.FC<TableProps | any> = ({ data }: TableProps) => {
    const [sortConfig, setSortConfig] = useState<
        { key: string; direction: string } | any
    >(null);
    const [searchQuery, setSearchQuery] = useState<any>("");

    // Helper function to get nested value
    const getNestedValue = (obj: any, path: string): any => {
        return path.split(".").reduce((acc, part) => acc && acc[part], obj);
    };

    // Function to handle sorting
    const handleSort = (key: string) => {
        let direction = "ascending";
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === "ascending"
        ) {
            direction = "descending";
        }
        setSortConfig({ key, direction });
    };

    // Function to sort data
    const sortedData = React.useMemo(() => {
        if (!sortConfig) return data?.data || [];
        const sorted = [...(data?.data || [])].sort((a, b) => {
            const aValue = getNestedValue(a, sortConfig.key);
            const bValue = getNestedValue(b, sortConfig.key);
            if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
            return 0;
        });
        return sorted;
    }, [data, sortConfig]);

    // Function to filter data based on search query
    const filteredData = sortedData.filter((item: any) =>
        data?.headers?.some((header: any) =>
            getNestedValue(item, header.fieldName)
                ?.toString()
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
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
                    style={{ width: "250px" }} // Makes search bar smaller
                />
            </div>
            <table className="table table-striped table-hover">
                <thead className="thead-dark">
                    <tr>
                        {data?.headers?.map((header: any, index: any) => (
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
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((rowData: any, rowIndex: any) => (
                        <tr key={`row-${rowIndex}`}>
                            {data?.headers?.map((header: any, colIndex: any) => (
                                <td key={`${header.viewName}-${header.fieldName}-${colIndex}`}>
                                    {getNestedValue(rowData, header?.fieldName)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
