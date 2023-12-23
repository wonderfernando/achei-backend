import { ResourceDontExist } from "../errors/ResourceDontExists";
import { IPostRepository } from "../repositories/PostRepository";
import { IUserRepository } from "../repositories/UserRepository";

export class ListAllPostByAgeId {
    constructor(private postRepository: IPostRepository) {}

    async execute(ageId:string){
        const posts = await this.postRepository.foundByAgeId(ageId);
        return posts
    }
}