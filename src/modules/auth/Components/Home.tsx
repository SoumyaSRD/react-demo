import { useEffect, useState } from "react";
import { UserService } from "../../../api/user.service";
import { IPagination } from "../../../models/extras/pagination.interface";
import { IUserDetails } from "../../../models/user/user.interface";
import CustomModal from "../shared/components/CustomModal";
import Header from "../shared/components/Header";
import Pagination, { InitialPaginationData } from "../shared/components/Pagination";
import Table, { ITableData } from "../shared/components/Table";
import * as CommonUtil from "../shared/utils/Common.util";
import CreateUser from "./CreateUser";

export enum DataTypes {
    pagination = "pagination",
    total = "total",
}

const Home = () => {
    const [user, setUser] = useState<ITableData<IUserDetails[]>>({
        data: [], // The actual data
        headers: [], // The table headers

        operations: {
            isEdit: false,
            isDelete: false
        }
    });
    const [refresh, setRefresh] = useState(true);
    const [pagination, setPagination] = useState<IPagination>({
        ...CommonUtil.Clone(InitialPaginationData),
    });

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedData, setSelectedData] = useState<any>(null);

    const handleshowCreateModal = () => setShowCreateModal(true);
    const handleCloseModal = (data: any) => {

        setShowCreateModal(false)
        return setSelectedData(null)
    };

    useEffect(() => {
        if (refresh) getUser();
    }, [refresh, user]);

    const getUser = async () => {
        try {
            let params = {
                page: pagination.page,
                limit: pagination.pageSize,
            };
            if (refresh) {
                let response = await UserService.filterUser(params);
                setRefresh(false);
                console.log(response.data?.data);
                let { data, totalCount }: any = response?.data?.data;

                setUser({
                    data,
                    operations: { isEdit: true, isDelete: true },
                    type: "User",
                    headers: [
                        { viewName: "Name", fieldName: "name" },
                        { viewName: "Creation Date", fieldName: "createdOn" },
                        { viewName: "Updation Date", fieldName: "modifiedOn" },
                        { viewName: "Email", fieldName: "email" },
                    ],
                });

                setPagination((pagination) => ({
                    ...pagination,
                    total: totalCount,
                }));
            }
        } catch (error) {

        }
    };

    const handlePageChange = (data: IPagination) => {
        setPagination((pagination) => ({
            ...pagination,
            ...data,
        }));
        setRefresh(true);
    };
    const onDeleteHandler = (data: any) => {


    }
    const onEditHandler = () => {


    }
    return (

        <div className="glassmorphism">
            <Header />
            <div><button className="btn btn-sm btn-success" onClick={handleshowCreateModal}>Create User</button></div>
            <Table data={user} onDelete={onDeleteHandler} onEdit={onEditHandler} />
            <Pagination pagination={pagination} onPageChange={handlePageChange} />
            <CustomModal
                show={showCreateModal}
                onHide={(data) => handleCloseModal(data)}
                title={`Create User`}
                data={selectedData || false}

            >
                <CreateUser onSubmit={(data: any) => console.log(data)}></CreateUser>
            </CustomModal>
        </div>

    );
};

export default Home;
export const TableData = {
    header: [],
};
