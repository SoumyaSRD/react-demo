

/* This code snippet defines an `authService` object in TypeScript that provides various methods related to handling authentication tokens and data storage using the browser's `localStorage`. Here's a breakdown of what each method does: */

import { httpClient } from "./HttpClient";

export const authService = {
    getItem: (name: string) => localStorage.getItem(name),
    delete: (name: string) => localStorage.getItem(name),
    setItem: (name: string, data: string) => localStorage.setItem(name, data),
    deleteAll: () => localStorage.clear(),
    login: (data: any) => httpClient.post(`http://localhost:3005/login`, data).then((res: any) => {
        console.log(res);

        authService.setItem('token', res?.data?.token)
        authService.setItem('expires', res?.data?.expires)

    }).catch((error) => {
        console.log(error);

    })
};


