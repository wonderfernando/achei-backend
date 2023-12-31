import { IComment } from "../entitites/Comment";
import { IBaseRepository } from "./BaseRepository";

export interface ICommentRepository extends IBaseRepository<IComment>{
    foundByPostId(postId:string) : Promise<IComment[]>
    
}