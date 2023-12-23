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

    async update (data: IComment, id: string) {
        const indexOf = this.comments.findIndex(comment => comment.id===id)
        this.comments[indexOf] = data
        return data
    }
    async delete (id: string){
        const newcomments = this.comments.filter(comment=> comment.id===id) 
        this.comments = newcomments
        return true
    };
    async list(){
        return this.comments
    }
    async findById (id: string){
        const comment = this.comments.find(comment => comment.id===id)
        return comment || null
    };
   
    
  
}