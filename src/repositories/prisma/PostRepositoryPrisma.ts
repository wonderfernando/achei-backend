import { randomUUID } from "crypto";
import { IPost } from "../../entitites/Post";
import { IPostRepository } from "../PostRepository";
import { prismaClient } from "../../utils/prismaClientLib";
export class PostRepositoryPrisma implements IPostRepository {
    async create (data: IPost) : Promise<IPost>{ 
        const newPost = await prismaClient.post.create({data})
        return {...newPost,latitude: Number(newPost.latitude),longitude:Number(newPost.longitude)}
    };
    async update (data:Partial<IPost> , id: string) {
        const post = await prismaClient.post.update({where: {id},data})
        return {...post,latitude: Number(post.latitude),longitude:Number(post.longitude)}
    }
    async delete (id: string){
        const post = await prismaClient.post.delete({where:{id}})
        return post != null
    };
    async list() : Promise<IPost[]>{
        const posts = await prismaClient.post.findMany()
        return posts
    }
    async findById (id: string){
        const post = await prismaClient.post.findUnique({where:{id}})
        return post || null
    };
   
    async foundByProvinceId(provinceId: string): Promise<IPost[]> {
        const posts = await prismaClient.post.findMany({where:{city_id:provinceId}})
        return posts
    }
    async foundByAgeId(ageId: string): Promise<IPost[]> {
        const posts = await prismaClient.post.findMany({where:{age_id: ageId}})
        return posts
    }
    async searchByName(name: string): Promise<IPost[]> {
        const posts = await prismaClient.post.findMany({
            where:{ name:{contains: name} }
        })
        return posts 
    }
  async search(name: string|null, provinceId: string|null, ageId: string|null): Promise<IPost[]> {
        const posts = await prismaClient.post.findMany({
            where:{name:{contains: name||""}, age_id:ageId||undefined, city_id: provinceId||undefined}
        })
        return posts
    }
  
}