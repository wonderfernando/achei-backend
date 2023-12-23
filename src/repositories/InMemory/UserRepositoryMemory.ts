import { randomUUID } from "crypto";
import { IUser } from "../../entitites/User";
import { IUserRepository } from "../UserRepository";

export class UserRepositoryMemory implements IUserRepository {
    users: IUser[] = []
    async create (data: IUser) { 
        const newUser = {...data, id: randomUUID()}
        this.users.push(newUser)    
        return newUser
    };
    async update (data: IUser, id: string) {
        const indexOf = this.users.findIndex(user => user.id===id)
        this.users[indexOf] = data
        return data
    }
    async delete (id: string){
        const newUsers = this.users.filter(user=> user.id===id) 
        this.users = newUsers
        return true
    };
    async list(){
        return this.users
    }
    async findById (id: string){
        const user = this.users.find(user => user.id===id)
        return user || null
    };
    async findByEmail(email:string){
        const user = this.users.find(user => user.email === email)
        return user || null
    };
}