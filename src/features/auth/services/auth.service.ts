/* 

* This code snippet defines an `authService` object in TypeScript that provides various methods related to handling         authentication tokens and data storage using the browser's `localStorage`. Here's a breakdown of what each method does: 

*/

import {
    deleteAllCookies,
    eraseCookie,
    getCookie,
    setCookie,
} from "@/services/cookie.service";
import { httpClient } from "@/services/api/HttpClient";

export const authService = {
    getItem: (name: string) => getCookie(name),
    removeItem: (name: string) => eraseCookie(name),
    setItem: (name: string, data: string) => setCookie(name, data),
    deleteAll: () => deleteAllCookies(),
    isAuthenticated: () => {
        return getCookie("token") ? true : false;
    },
    login: (data: any) =>
        httpClient.post(`${import.meta.env.VITE_API_BASE_URL}auth/login`, data),
    logout: (data: any) => {
        return deleteAllCookies();
        //localStorage.clear()
        // return httpClient.get(`http://localhost:5000/logout`);
    },
};
