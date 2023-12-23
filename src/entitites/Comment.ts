export interface IComment{
    id?:string,
    comment: string,
    user_id: string,
    post_id: string,
    createdAt?: Date|string,
}