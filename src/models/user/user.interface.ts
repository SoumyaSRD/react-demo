import { IOperations } from "../../modules/auth/shared/components/Table";

export interface IUser {
    limit?: number;
    skip?: number;
    total?: number;
    data?: IUserDetails[];
    headers?: any[];
    operations?: IOperations
}



export interface IUserDetails {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
    age?: string;
    address?: string;
    type?: string;
    departments?: string;
}

export interface IHair {
    color?: string;
    type?: string;
}

export interface IAddress {
    address?: string;
    city?: string;
    state?: string;
    stateCode?: string;
    postalCode?: string;
    coordinates?: Coordinates;
    country?: string;
}

export interface Coordinates {
    lat?: number;
    lng?: number;
}

export interface Bank {
    cardExpire?: string;
    cardNumber?: string;
    cardType?: string;
    currency?: string;
    iban?: string;
}

export interface ICompany {
    department?: string;
    name?: string;
    title?: string;
    address?: Address2;
}

export interface Address2 {
    address?: string;
    city?: string;
    state?: string;
    stateCode?: string;
    postalCode?: string;
    coordinates?: Coordinates2;
    country?: string;
}

export interface Coordinates2 {
    lat?: number;
    lng?: number;
}

export interface ICrypto {
    coin?: string;
    wallet?: string;
    network?: string;
}
