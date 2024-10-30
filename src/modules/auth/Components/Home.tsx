import { useEffect, useState } from "react";
import { UserService } from "../../../api/user.service";
import { IPagination } from "../../../models/extras/pagination.interface";
import { IUser } from "../../../models/user/user.interface";
import Header from "../shared/components/Header";
import Pagination, { InitialPaginationData } from "../shared/components/Pagination";
import * as CommonUtil from "../shared/utils/Common.util";
export enum DataTypes {
    pagination = 'pagination',
    total = 'total'
}
const Home = () => {
    const [user, setUser] = useState<IUser>()
    const [refresh, setRefresh] = useState(true)

    const [pagination, setPagination] = useState<IPagination>({
        ...(CommonUtil.Clone(InitialPaginationData)),
    })

    useEffect(() => {
        if (refresh) getUser()
    }, [refresh, user])

    const getUser = async () => {

        try {
            let params = {
                page: pagination.page, limit: pagination.pageSize
            }
            if (refresh) {
                let response = await UserService.getUser({ params })
                setRefresh(false)
                console.log(response.data)
                setUser(user)
            }

        } catch (error) {

        }
    }


    const handlePageChange = (data: IPagination) => {
        console.log('page', data);

        setPagination((pagination) => {
            return {
                ...pagination,
                ...data
            }
        })
        setRefresh(true)
    }

    return <>
        <div className="container-fluid">

            <Header />
            <button onClick={() => setRefresh(true)}>click</button>
            {/* <Table data={user} /> */}
            <Pagination pagination={pagination}
                onPageChange={handlePageChange}
                total={user?.total || 0}
            />

        </div>

    </>
};

export default Home;
export const TableData = {
    header: []
}