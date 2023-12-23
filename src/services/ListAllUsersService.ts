import { ResourceDontExist } from "../errors/ResourceDontExists";
import { IUserRepository } from "../repositories/UserRepository";

export class ListAllusersService {
    constructor(private userRepository: IUserRepository) {}

    async execute(){
        const user = await this.userRepository.list();
        return user
    }
}