import { httpClient } from "@/services/api/HttpClient";

export const BaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://dummyjson.com/';

export const UserService = {
    getUser: (config?: any) => {
        return httpClient.get(`${BaseUrl}users`, config)
    },
    filterUser: (params: any, config?: any) => {
        const { limit, page } = params;
        const skip = (page - 1) * limit;
        return httpClient.get(`${BaseUrl}users?limit=${limit}&skip=${skip}`, config)
    }, weatherReport: () => {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY || '55a0412680d641ec86994702241311';
        return httpClient.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Chhattisgarh`)
    }

}

// this.http.get(`${this.apiUrl}/current.json?key=${this.apiKey}&q=${location}`);