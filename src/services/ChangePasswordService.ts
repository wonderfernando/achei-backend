import { hash } from "bcryptjs";
import { IUserRepository } from "../repositories/UserRepository";
import { IUser } from "../entitites/User";
import { ResourceDontExist } from "../errors/ResourceDontExists";

interface IChangePassword{
    user_id: string,
    newPassword:string
}
export class ChangePasswordService {
    constructor(private userRepository: IUserRepository) {}
    async execute(data :IChangePassword){
        const user = await this.userRepository.findById(data.user_id)
        if(!user)
            throw new ResourceDontExist()
        const hashPassword = await hash(data.newPassword,1)
        user.password = hashPassword
        return this.userRepository.update(user, data.user_id)
     }
}