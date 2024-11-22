import { httpClient } from "./HttpClient";

export const BaseUrl = "http://localhost:5000/";

export const UserService = {
    getUser: (config?: any) => {
        return httpClient.get(`${BaseUrl}users`, config)
    },
    filterUser: (payload: any, config?: any) => {
        return httpClient.post(`${BaseUrl}user/filter`, payload, config)
    }, weatherReport: () => {
        return httpClient.get(`http://api.weatherapi.com/v1/current.json?key=55a0412680d641ec86994702241311&q=Chhattisgarh`)
    }

}

// this.http.get(`${this.apiUrl}/current.json?key=${this.apiKey}&q=${location}`);