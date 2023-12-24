import { ResourceDontExist } from "../errors/ResourceDontExists";
import { ICommentRepository } from "../repositories/CommentRepository";
import { IUserRepository } from "../repositories/UserRepository";

export class ListAllComments {
    constructor(private commentRepository: ICommentRepository) {}

    async execute(){
        const comments = await this.commentRepository.list();
        return comments
    }
}