interface IComment{
    id?:string,
    comment: string,
    user_id: string,
    createdAt?: Date|string,
}