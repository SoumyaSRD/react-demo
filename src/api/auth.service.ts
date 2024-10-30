/* This code snippet defines an `authService` object in TypeScript that provides various methods related to handling authentication tokens and data storage using the browser's `localStorage`. Here's a breakdown of what each method does: */

import { deleteAllCookies, eraseCookie, getCookie, setCookie } from "./cookie.service";
import { httpClient } from "./HttpClient";

export const authService = {
    getItem: (name: string) => getCookie(name),
    removeItem: (name: string) => eraseCookie(name),
    setItem: (name: string, data: string) => setCookie(name, data),
    deleteAll: () => deleteAllCookies(),
    isAuthenticated: () => {
        console.log(">>>>", document.cookie)
        return (getCookie("token") ? true : false)
    },
    login: (data: any) => httpClient.post(`http://localhost:3005/auth/login`, data, { credentials: 'include' }),
    logout: (data: any) => httpClient.get(`http://localhost:5000/logout`),
};
