import { ResourceDontExist } from "../errors/ResourceDontExists";
import { IPostRepository } from "../repositories/PostRepository";
import { IUserRepository } from "../repositories/UserRepository";

export class ListAllPostSearchService {
    constructor(private postRepository: IPostRepository) {}

    async execute(ageId:string|null, provinceId:string|null, name: string|null){
        const posts = await this.postRepository.search(name,provinceId,ageId);
        return posts
    }
}