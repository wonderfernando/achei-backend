import { randomUUID } from "crypto";
import { IComment } from "../../entitites/Comment";
import { IPostRepository } from "../PostRepository";
import { IAgeRepository } from "../AgeRepository";
import { ICommentRepository } from "../CommentRepository";


export class CommentRepositoryInMemory implements ICommentRepository {

    comments: IComment[] = []

    async create (data: IComment) { 
        const newComment = {...data, id: randomUUID()}
        this.comments.push(newComment)    
        return newComment
    };

    async update (data: {[key:string]: any}, id: string) {
        const indexOf = this.comments.findIndex(comment => comment.id===id)
        const comment =  this.comments[indexOf]
        this.comments[indexOf] ={...comment,...data}
        return  this.comments[indexOf]
    }
    async delete (id: string){
        const newcomments = this.comments.filter(comment=> comment.id !== id) 
        if (newcomments.length<this.comments.length) {
            this.comments = newcomments
            return true
        }
        return false
    };
    async list(){
        return this.comments
    }
    async findById (id: string){
        const comment = this.comments.find(comment => comment.id===id)
        return comment || null
    };
    async foundByPostId(postId: string): Promise<IComment[]> {
        const comments = this.comments.filter(comment=> comment.post_id===postId)
        return comments
    }

    
  
}