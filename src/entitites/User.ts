export interface IUser{
    id?:string,
    name:string,
    email:string,
    password: string,
    admin: boolean,
    phone: string,
    city_id: string,
    createdAt?: Date|string,
}