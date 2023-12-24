import { IUserRepository } from "../repositories/UserRepository";
import { ResourceDontExist } from "../errors/ResourceDontExists";
import { IPostRepository } from "../repositories/PostRepository";
import { ILike } from "../entitites/Like";
import { ILikeRepository } from "../repositories/LikeRepository";
 
export class AddLikeInPostService {
    constructor(private likeRespository: ILikeRepository, private postRepository: IPostRepository,private userRepository: IUserRepository) {}
    async execute(data :ILike){
        const user = await this.userRepository.findById(data.user_id)
        const post = await this.postRepository.findById(data.post_id)
        if (!user || !post) {
            throw new ResourceDontExist()
        }
        const like = await this.likeRespository.create(data)
        return like
     }
}