import { useEffect, useState, useCallback } from "react";
import { UserService } from "@/features/user/services/user.service";
import { IPagination } from "@/types/pagination.interface";
import { IUserDetails } from "@/types/user.interface";
import CustomModal from "@/components/shared/CustomModal";
import Pagination, {
    InitialPaginationData,
} from "@/components/shared/Pagination";
import Table, { ITableData } from "@/components/shared/Table";
import * as CommonUtil from "@/utils/Common.util";
import CreateUser from "@/features/user/pages/CreateUser";

const Home = () => {
    const [user, setUser] = useState<ITableData<IUserDetails[]>>({
        data: [], 
        headers: [], 
        operations: { isEdit: true, isDelete: true },
    });
    const [refresh, setRefresh] = useState(true);
    const [pagination, setPagination] = useState<IPagination>({
        ...CommonUtil.Clone(InitialPaginationData),
    });

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedData, setSelectedData] = useState<any>(null);

    const handleshowCreateModal = () => {
        setSelectedData(null);
        setShowCreateModal(true);
    };
    const handleCloseModal = () => {
        setShowCreateModal(false);
        setSelectedData(null);
    };

    const getUser = useCallback(async () => {
        try {
            let params = {
                page: pagination.page,
                limit: pagination.pageSize,
            };
            let response = await UserService.filterUser(params);
            let { users: data, total: totalCount }: any = response?.data;

            setUser({
                data,
                operations: { isEdit: true, isDelete: true },
                type: "User",
                headers: [
                    { viewName: "First Name", fieldName: "firstName" },
                    { viewName: "Last Name", fieldName: "lastName" },
                    { viewName: "Age", fieldName: "age" },
                    { viewName: "Username", fieldName: "username" },
                    { viewName: "Company", fieldName: "company.name" },
                ],
            });

            setPagination((prev) => ({
                ...prev,
                total: totalCount,
            }));
            setRefresh(false);
        } catch (error) { 
            setRefresh(false);
        }
    }, [pagination.page, pagination.pageSize]);

    useEffect(() => {
        if (refresh) {
            getUser();
        }
    }, [refresh, getUser]);

    const handlePageChange = (data: Partial<IPagination>) => {
        setPagination((prev) => ({
            ...prev,
            ...data,
        }));
        setRefresh(true);
    };

    const onDeleteHandler = (data: any) => {
        console.log("Delete user:", data);
    };
    
    const onEditHandler = (data: any) => {
        setSelectedData(data);
        setShowCreateModal(true);
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="text-main m-0 fw-bold-custom">User Management</h3>
                <button
                    className="btn btn-glass-primary shadow-sm px-4"
                    onClick={handleshowCreateModal}
                >
                    + Create User
                </button>
            </div>
            
            <div className="w-100">
                <Table data={user} onDelete={onDeleteHandler} onEdit={onEditHandler} />
            </div>

            <Pagination 
                currentPage={pagination.page || 1}
                totalCount={pagination.total || 0}
                pageSize={pagination.pageSize || 5}
                onPageChange={(page) => handlePageChange({ page })}
                onPageSizeChange={(pageSize) => handlePageChange({ pageSize, page: 1 })}
            />

            <CustomModal
                id="CreateUserModal"
                show={showCreateModal}
                onHide={handleCloseModal}
                title={selectedData ? `Edit User` : `Create User`}
            >
                <CreateUser 
                    key={selectedData ? selectedData.id : "create"}
                    initialValue={selectedData ? {
                        username: selectedData.username || selectedData.email,
                        firstName: selectedData.firstName || "",
                        lastName: selectedData.lastName || "",
                        age: selectedData.age || "",
                        password: "", 
                    } : undefined}
                    onSubmit={(data: any) => {
                        console.log("Submit:", data);
                        handleCloseModal();
                    }}
                />
            </CustomModal>
        </div>
    );
};

export default Home;
