import { compare } from "bcryptjs";
import { IUserRepository } from "../repositories/UserRepository";

interface IUserAuth{
    email:string, 
    password: string
}
export class UserAuthService {
    constructor(private userRepository: IUserRepository) {}
    async execute(data: IUserAuth){
        const user = await this.userRepository.findByEmail(data.email)
        if (!user) {
            throw new Error("Resource dont exists")
        }
        const isEqual = await compare(data.password, user.password)
        
        if (!isEqual) 
            throw new Error("Resource dont exists")

        return user;
    }
}