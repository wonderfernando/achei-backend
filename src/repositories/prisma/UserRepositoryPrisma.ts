import { randomUUID } from "crypto";
import { IUser } from "../../entitites/User";
import { IUserRepository } from "../UserRepository";
import { prismaClient } from "../../utils/prismaClientLib";

export class UserRepositoryMemory implements IUserRepository {

    async create (data: IUser) { 
        const newUser = await prismaClient.user.create({data})  
        return newUser
    };
    async update (data: Partial<IUser>, id: string) {
       const user = prismaClient.user.update({where:{id}, data})
       return user
    }
    async delete (id: string){
       const isDeleted = prismaClient.user.delete({where:{id}})
        return isDeleted!=null 
    };
    async list(){
        return prismaClient.user.findMany()
    }
    async findById (id: string){
        const user = await prismaClient.user.findUnique({where:{id}})
        return user || null
    };
    async findByEmail(email:string){
        const user = await prismaClient.user.findUnique({where:{email}})
        return user || null
    };
}