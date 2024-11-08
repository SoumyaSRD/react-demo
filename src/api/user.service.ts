import { httpClient } from "./HttpClient";

export const BaseUrl = "http://localhost:5000/";

export const UserService = {
    getUser: (config?: any) => {
        return httpClient.get(`${BaseUrl}users`, config)
    },
    filterUser: (payload: any, config?: any) => {
        return httpClient.patch(`${BaseUrl}users/filterUser`, payload, config)
    }

}