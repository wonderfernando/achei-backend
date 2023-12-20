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
    update: (data: IUser, id: string) => Promise<IUser | null>;
    delete: (id: string) => boolean;
    list: () => Promise<IUser[]>;
    findById: (id: string) => Promise<IUser | null>;
    async findByEmail(email:string){
        const user = this.users.find(user => user.email === email)
        return user || null
    };
}