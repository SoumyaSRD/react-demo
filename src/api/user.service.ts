import { httpClient } from "./HttpClient";

export const BaseUrl = "https://dummyjson.com/";

export const UserService = {
    getUser: (config?: any) => {
        return httpClient.get(`${BaseUrl}users`, config)
    }
}