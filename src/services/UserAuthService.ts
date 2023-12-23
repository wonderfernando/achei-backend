import { compare } from "bcryptjs";
import { IUserRepository } from "../repositories/UserRepository";
import { ResourceDontExist } from "../errors/ResourceDontExists";

interface IUserAuth{
    email:string, 
    password: string
}
export class UserAuthService {
    constructor(private userRepository: IUserRepository) {}
    async execute(data: IUserAuth){
        const user = await this.userRepository.findByEmail(data.email)
        if (!user) {
            throw new ResourceDontExist()
        }
        const isEqual = await compare(data.password, user.password)
        
        if (!isEqual) 
            throw new ResourceDontExist()

        return user;
    }
}