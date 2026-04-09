import React, { useState } from "react";
import CustomModal from "./CustomModal";
import { 
  PencilSquare, 
  Trash, 
  CaretUpFill, 
  CaretDownFill,
  Search
} from 'react-bootstrap-icons';

interface Header {
    viewName: string;
    fieldName: string;
}

interface TableData<T> {
    [key: string]: T;
}

export interface IOperations {
    isEdit: boolean;
    isDelete: boolean;
}

export interface ITableData<T> {
    data?: TableData<T>[];
    headers?: Header[];
    operations?: IOperations;
    type?: string
}

export interface ITableProps<T> {
    data: ITableData<T>;
    onEdit: (rowData: TableData<T>) => void;
    onDelete: (rowData: TableData<T>) => void;
}

const Table: React.FC<ITableProps<any>> = ({ data, onEdit, onDelete }: ITableProps<any>) => {
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedData, setSelectedData] = useState<any>(null);

    const handleCloseDeleteModal = (confirmed: boolean) => {
        if (confirmed && selectedData) {
            onDelete(selectedData);
        }
        setShowDeleteModal(false);
        setSelectedData(null);
    };

    const getNestedValue = (obj: any, path: string): any => {
        if (!path) return '';
        return path.split(".").reduce((acc, part) => acc && acc[part], obj);
    };

    const handleSort = (key: string) => {
        let direction = "ascending";
        if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }
        setSortConfig({ key, direction });
    };

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

    const filteredData = sortedData.filter((item: any) =>
        data?.headers?.some((header: any) =>
            getNestedValue(item, header.fieldName)?.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    return (
        <div className="w-100 custom-table-wrapper">
            <div className="table-search-area p-4">
                <div className="input-group" style={{ maxWidth: "350px" }}>
                    <span className="input-group-text border-0 ps-3 text-muted-custom">
                        <Search size={18} />
                    </span>
                    <input
                        type="text"
                        className="form-control glass-input border-0 shadow-none ps-2"
                        placeholder="Search records..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
            <div className="table-responsive">
                <table className="custom-table align-middle">
                    <thead>
                        <tr>
                            {data?.headers?.map((header, index) => (
                                <th
                                    key={`${header.viewName}-${index}`}
                                    onClick={() => handleSort(header.fieldName)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <div className="d-flex align-items-center gap-2">
                                        {header?.viewName}
                                        {sortConfig?.key === header.fieldName && (
                                            sortConfig.direction === "ascending" ? 
                                            <CaretUpFill size={12} className="icon-primary" /> : 
                                            <CaretDownFill size={12} className="icon-primary" />
                                        )}
                                    </div>
                                </th>
                            ))}
                            <th className="text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? filteredData.map((rowData, rowIndex) => (
                            <tr key={`row-${rowData.id || rowIndex}`}>
                                {data?.headers?.map((header, colIndex) => (
                                    <td key={`${header.viewName}-${colIndex}`}>
                                        {getNestedValue(rowData, header?.fieldName)}
                                    </td>
                                ))}
                                <td className="text-end">
                                    <div className="d-flex gap-2 justify-content-end">
                                        {data?.operations?.isEdit && (
                                            <button
                                                className="btn btn-sm glass-panel border-0 p-2 rounded-3 shadow-none"
                                                onClick={() => onEdit(rowData)}
                                                title="Edit"
                                            >
                                                <PencilSquare size={16} className="icon-primary" />
                                            </button>
                                        )}
                                        {data?.operations?.isDelete && (
                                            <button
                                                className="btn btn-sm glass-panel border-0 p-2 rounded-3 shadow-none"
                                                onClick={() => {
                                                    setSelectedData(rowData)
                                                    setShowDeleteModal(true)
                                                }}
                                                title="Delete"
                                            >
                                                <Trash size={16} className="icon-danger" />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={(data?.headers?.length || 0) + 1} className="text-center py-5 text-muted-custom">
                                    No records found matching your search.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <CustomModal
                id="DeleteConfirmModal"
                show={showDeleteModal}
                onHide={() => handleCloseDeleteModal(false)}
                title={`Confirm Deletion`}
                buttonProperties={{
                    saveButtonText: "Confirm Delete",
                    saveButtonColor: "btn-danger"
                }}
            >
                <div className="text-center p-4">
                    <div className="mb-4 d-inline-flex p-3 rounded-circle glass-panel">
                        <Trash size={40} className="icon-danger" />
                    </div>
                    <h5 className="fw-bold-custom mb-3 text-main">Are you sure?</h5>
                    <p className="text-muted-custom mb-0 px-3">
                        You are about to delete <strong>{selectedData?.firstName} {selectedData?.lastName}</strong>. 
                        This action will permanently remove their record.
                    </p>
                </div>
            </CustomModal>
        </div >
    );
};

export default Table;
