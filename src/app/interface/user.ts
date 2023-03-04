import { Coordinate } from "./coordinate";

export interface User {
    uuid: string,
    firstName: string,
    LastName: string,
    email: string,
    username: string,
    gender: string,
    address: string,
    dateOfBirth: string,
    phone: string,
    imageUrl: string,
    coordinate: Coordinate
}
