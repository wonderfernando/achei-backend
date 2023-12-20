interface IPost{
    id?:string,
    title:string,
    description:string,
    img: string,
    img2?: string,
    contact1: string,
    contact2?: string,
    user_id: string,
    latitude?: number,
    longitude?: number,
    createdAt?: Date|string,
}