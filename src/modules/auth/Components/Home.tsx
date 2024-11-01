import { useEffect, useState } from "react";
import { UserService } from "../../../api/user.service";
import { IPagination } from "../../../models/extras/pagination.interface";
import { IUser } from "../../../models/user/user.interface";
import Header from "../shared/components/Header";
import Pagination, { InitialPaginationData } from "../shared/components/Pagination";
import Table from "../shared/components/Table";
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
                let response = await UserService.filterUser(params)
                setRefresh(false)
                console.log("response", response?.data)


                setUser(response?.data)
                setPagination((pagination: IPagination) => {
                    return {
                        ...pagination,
                        total: response?.data?.total
                    }
                })
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
            <Table data={{
                headers: Object.keys(user?.data || {})?.map((res) => {
                    return {
                        name: res
                    }
                }),
                body: user?.data
            }} />
            {/* <ul>
                {user?.data?.map((res: any) => <li>
                    {res?.email}
                </li>)}
            </ul> */}
            <Pagination pagination={pagination}
                onPageChange={handlePageChange}

            />

        </div>

    </>
};

export default Home;
export const TableData = {
    header: []
}