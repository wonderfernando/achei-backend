import { ResourceDontExist } from "../errors/ResourceDontExists";
import { IPostRepository } from "../repositories/PostRepository";
import { IUserRepository } from "../repositories/UserRepository";

export class ListAllPostService {
    constructor(private postRepository: IPostRepository) {}

    async execute(){
        const posts = await this.postRepository.list();
        return posts
    }
}