import { hash } from "bcryptjs";
import { IUserRepository } from "../repositories/UserRepository";
import { IUser } from "../entitites/User";
import { ResourceDontExist } from "../errors/ResourceDontExists";
import { IPostRepository } from "../repositories/PostRepository";
import { IPost } from "../entitites/Post";
import { ICommentRepository } from "../repositories/CommentRepository";
import { IComment } from "../entitites/Comment";

export class AddCommentstService {
    constructor(private commentRespository: ICommentRepository, private postRepository: IPostRepository,private userRepository: IUserRepository) {}
    async execute(data :IComment){
        const user = await this.userRepository.findById(data.user_id)
        const post = await this.postRepository.findById(data.post_id)
        
        if (!user || !post) {
            throw new ResourceDontExist()
        }
        const comment = await this.commentRespository.create(data)
        return comment
     }
}