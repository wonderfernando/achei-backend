import { ResourceDontExist } from "../errors/ResourceDontExists";
import { IPostRepository } from "../repositories/PostRepository";
import { IUserRepository } from "../repositories/UserRepository";

export class ListAllPostByNameService {
    constructor(private postRepository: IPostRepository) {}

    async execute(name:string){
        const posts = await this.postRepository.searchByName(name);
        return posts
    }
}