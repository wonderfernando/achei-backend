import { randomUUID } from "crypto";
import { IPost } from "../../entitites/Post";
import { IPostRepository } from "../PostRepository";
import { IAgeRepository } from "../AgeRepository";
import { IAge } from "../../entitites/Age";
import { prismaClient } from "../../utils/prismaClientLib";


export class AgeRepositoryPrisma implements IAgeRepository {

    ages: IAge[] = []

    async create (data: IAge) { 
        const newAge = await prismaClient.age.create({data})
        return newAge
    };
    async update (data:Partial<IAge>, id: string) {
        const age = await prismaClient.age.update({where:{id}, data})
        return age
    }
    async delete (id: string){
        const age = await prismaClient.age.delete({where:{id}})
        return age != null
    };
    async list(){
        return await prismaClient.age.findMany()
    }
    async findById (id: string){
        const age = await prismaClient.age.findUnique({where:{id}})
        return age || null
    };
   
    
  
}