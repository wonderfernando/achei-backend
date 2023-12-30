export interface IPost{
    id?:string,
    type:string,
    name:string,
    description:string,
    img: string,
    img2?: string|null,
    contact1: string,
    contact2?: string|null,
    user_id: string,
    latitude?: number|null,
    longitude?: number|null,
    gender: string,
    status?: string|null,
    age_id:string,
    disaperAt?: string|null,
    foundAt?: Date|string|null,
    localFound?: string|null,
    localDisaper?:string|null,
    city_id: string, 
    createdAt?: Date|string,
}