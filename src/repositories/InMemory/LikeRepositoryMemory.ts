import { randomUUID } from "crypto";
import { IComment } from "../../entitites/Comment";
import { IPostRepository } from "../PostRepository";
import { IAgeRepository } from "../AgeRepository";
import { ICommentRepository } from "../CommentRepository";
import { ILike } from "../../entitites/Like";
import { ILikeRepository } from "../LikeRepository";


export class LikeRepositoryInMemory implements ILikeRepository {
  

    likes: ILike[] = []

    async create (data: ILike) { 
        const newLike = {...data, id: randomUUID()}
        this.likes.push(newLike)    
        return newLike
    };
   async findById (id: string){
    const like = this.likes.find(like => like.id ===id)
    return like || null
   }
    async delete (id: string){
        const newLikes = this.likes.filter(like=> like.id !== id) 
        if (newLikes.length<this.likes.length) {
            this.likes = newLikes
            return true
        }
        return false
    };
 
    async foundByPostIdUSerId (postId: string,userId:string){
        const comments = this.likes.filter(like => like.post_id===postId && like.user_id===userId)
        return comments
    };
    async foundByPostId(postId: string) {
        const likes = this.likes.filter(like=> like.post_id===postId)
        return likes
    }

    
    update: (data: { [key: string]: any; }, id: string) => Promise<ILike | null>;
    async list () {
        return this.likes
    }
}