import { ResourceDontExist } from "../errors/ResourceDontExists";
import { IUserRepository } from "../repositories/UserRepository";

export class GetProfileById {
    constructor(private userRepository: IUserRepository) {}

    async execute(id:string){
        const user = await this.userRepository.findById(id);
        if (!user) 
            throw new ResourceDontExist()
        return user
    }
}