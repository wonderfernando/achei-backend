import { ILike } from "../entitites/Like";
import { IBaseRepository } from "./BaseRepository";

export interface ILikeRepository extends IBaseRepository<ILike>{
    foundByPostId(postId:string): Promise<ILike[]>
    foundByPostIdUSerId(postId:string,userId:string): Promise<ILike|null>
}