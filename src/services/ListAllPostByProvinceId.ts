import { ResourceDontExist } from "../errors/ResourceDontExists";
import { IPostRepository } from "../repositories/PostRepository";
import { IUserRepository } from "../repositories/UserRepository";

export class ListAllPostByProvinceId {
    constructor(private postRepository: IPostRepository) {}

    async execute(provinceId:string){
        const posts = await this.postRepository.foundByProvinceId(provinceId);
        if (!posts) 
            throw new ResourceDontExist()
        return posts
    }
}