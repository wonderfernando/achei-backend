import { hash } from "bcryptjs";
import { IUserRepository } from "../repositories/UserRepository";
import { IUser } from "../entitites/User";
import { ResourceDontExist } from "../errors/ResourceDontExists";
import { IPostRepository } from "../repositories/PostRepository";
import { IPost } from "../entitites/Post";

export class AddPostService {
    constructor(private postRepository: IPostRepository,private userRepository: IUserRepository) {}
    async execute(data :IPost){
        const user = await this.userRepository.findById(data.user_id)
        if (!user) {
            throw new ResourceDontExist()
        }
        const post = await this.postRepository.create(data)
        return post
     }
}