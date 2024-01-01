import { IUserRepository } from "../repositories/UserRepository";
import { ResourceDontExist } from "../errors/ResourceDontExists";
import { IPostRepository } from "../repositories/PostRepository";
import { ILike } from "../entitites/Like";
import { ILikeRepository } from "../repositories/LikeRepository";
 
export class ListAllLikeInPostService {
    constructor(private likeRespository: ILikeRepository, private postRepository: IPostRepository) {}
    async execute(idPost :string){
        const post = await this.postRepository.findById(idPost)
        if (!post) {
            throw new ResourceDontExist()
        }
        const likes = await this.likeRespository.foundByPostId(idPost)
        return likes
     }
}