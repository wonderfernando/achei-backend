import { randomUUID } from "crypto";
import { IComment } from "../../entitites/Comment";
import { IPostRepository } from "../PostRepository";
import { IAgeRepository } from "../AgeRepository";
import { ICommentRepository } from "../CommentRepository";
import { prismaClient } from "../../utils/prismaClientLib";


export class CommentRepositoryPrisma implements ICommentRepository {

    async create (data: IComment) { 
        const newComment = await prismaClient.comment.create({data})
        return newComment
    };

    async update (data: Partial<IComment>, id: string)  {
        const comment =  await prismaClient.comment.update({where:{id}, data})
        return comment || null
    }
    async delete (id: string){
        const comment = await prismaClient.comment.delete({where:{id}})    
        return comment != null
    };
    async list(){
        return await prismaClient.comment.findMany()
    }
    async findById (id: string){
        const comment = await prismaClient.comment.findUnique({where:{id}})
        return comment || null
    };
    async foundByPostId(postId: string): Promise<IComment[]> {
        const comments = await prismaClient.comment.findMany({where:{post_id:postId}})
        return comments
    }

    
  
}