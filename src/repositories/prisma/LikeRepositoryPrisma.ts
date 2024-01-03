import { randomUUID } from "crypto";
import { IComment } from "../../entitites/Comment";
import { IPostRepository } from "../PostRepository";
import { IAgeRepository } from "../AgeRepository";
import { ICommentRepository } from "../CommentRepository";
import { ILike } from "../../entitites/Like";
import { ILikeRepository } from "../LikeRepository";
import { prismaClient } from "../../utils/prismaClientLib";


export class LikeRepositoryIPrisma implements ILikeRepository {
    public update = async (data: Partial<ILike>, id: string) => null
     public list = async () =>  []
   
   async create (data: ILike) { 
        const newLike = await prismaClient.like.create({data})   
        return newLike
    };
   async findById (id: string){
    const like = await prismaClient.like.findUnique({where:{id}})
    return like 
   }
    async delete (id: string){
        const like = await prismaClient.like.delete({where:{id}})
        return like!=null
    };
 
    async foundByPostIdUSerId (postId: string,userId:string){
        const like = await prismaClient.like.findFirst({where:{user_id:userId, post_id:postId}})
        return like
    };
    async foundByPostId(postId: string) {
        const likes = await prismaClient.like.findMany({where:{ post_id:postId}})
        return likes
    }

 
  
}