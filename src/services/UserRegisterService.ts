import { hash } from "bcryptjs";
import { IUser } from "../entitites/User";
import { IUserRepository } from "../repositories/UserRepository";

export class UserRegisterService {
    constructor(private userRepository: IUserRepository) {}
    async execute(data : IUser){
      data.password = await hash(data.password,1)
      const user = await this.userRepository.create(data)
      return user;
    }
}