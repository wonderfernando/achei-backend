import { IUserRepository } from "../repositories/UserRepository";
import {ResourceDontExist} from "../errors/ResourceDontExists"
export class DeleteProfileService {
    constructor(private userRepository: IUserRepository){}
    
    async execute(id: string){
        const user =  await this.userRepository.findById(id)
        if (!user)
            throw new ResourceDontExist()
        const isDeleted = await this.userRepository.delete(id)
        return isDeleted    
    }
}