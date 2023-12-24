import { ResourceDontExist } from "../errors/ResourceDontExists";
import { IUserRepository } from "../repositories/UserRepository";

interface IEditProfile{
    name?:string,
    email?:string,
    password?: string,
    admin?: boolean,
    phone?: string,
    city_id?: string,
}
export class EditProfileService {
    constructor(private userRepository: IUserRepository) {}

    async execute(data:IEditProfile, id:string){
        const user = await this.userRepository.findById(id)
         
        if(!user)
            throw new ResourceDontExist()
 
       return await this.userRepository.update(data, id)    
    }
}