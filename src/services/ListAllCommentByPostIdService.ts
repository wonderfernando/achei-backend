import { ResourceDontExist } from "../errors/ResourceDontExists";
import { ICommentRepository } from "../repositories/CommentRepository";
import { IUserRepository } from "../repositories/UserRepository";

export class ListAllCommentsByPostId {
    constructor(private commentRepository: ICommentRepository) {}

    async execute(postId:string){
        const comments = await this.commentRepository.foundByPostId(postId);
        return comments
    }
}