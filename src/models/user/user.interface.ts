
export interface IUser {
    limit?: number;
    skip?: number;
    total?: number;
    data?: IUserDetails[]
}

export interface IUserDetails {
    id?: number;
    firstName?: string;
    lastName?: string;
    maidenName?: string;
    age?: number;
    gender?: string;
    email?: string;
    phone?: string;
    username?: string;
    password?: string;
    birthDate?: string;
    image?: string;
    bloodGroup?: string;
    height?: number;
    weight?: number;
    eyeColor?: string;
    hair?: IHair;
    ip?: string;
    address?: IAddress;
    macAddress?: string;
    university?: string;
    bank?: Bank;
    company?: ICompany;
    ein?: string;
    ssn?: string;
    userAgent?: string;
    crypto?: ICrypto;
    role?: string;
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
