import { useEffect, useState } from "react";
import { UserService } from "../../../api/user.service";
import { IPagination } from "../../../models/extras/pagination.interface";
import { IUser } from "../../../models/user/user.interface";
import Header from "../shared/components/Header";
import Pagination, { InitialPaginationData } from "../shared/components/Pagination";
import Table from "../shared/components/Table";
import * as CommonUtil from "../shared/utils/Common.util";

export enum DataTypes {
    pagination = "pagination",
    total = "total",
}

const Home = () => {
    const [user, setUser] = useState<IUser>({
        data: [], // The actual data
        headers: [] // The table headers
    });
    const [refresh, setRefresh] = useState(true);
    const [pagination, setPagination] = useState<IPagination>({
        ...CommonUtil.Clone(InitialPaginationData),
    });

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
                let { data, total }: any = response?.data;

                setUser({
                    data,
                    headers: [
                        { viewName: "Name", fieldName: "name", isAuth: true },
                        { viewName: "Creation Date", fieldName: "createdOn" },
                        { viewName: "Updation Date", fieldName: "modifiedOn" },
                        { viewName: "Email", fieldName: "email" },
                    ],
                });

                setPagination((pagination) => ({
                    ...pagination,
                    total: response?.data?.total,
                }));
            }
        } catch (error) {
            console.error("Failed to fetch user data", error);
        }
    };

    const handlePageChange = (data: IPagination) => {
        setPagination((pagination) => ({
            ...pagination,
            ...data,
        }));
        setRefresh(true);
    };

    return (
        <div className="container-fluid">
            <Header />
            <div className="glassmorphism">
                <Table data={user} />
                <Pagination pagination={pagination} onPageChange={handlePageChange} />
            </div>
        </div>
    );
};

export default Home;
export const TableData = {
    header: [],
};
