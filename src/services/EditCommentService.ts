import { hash } from "bcryptjs";
import { IUserRepository } from "../repositories/UserRepository";
import { IUser } from "../entitites/User";
import { ResourceDontExist } from "../errors/ResourceDontExists";
import { IPostRepository } from "../repositories/PostRepository";
import { IPost } from "../entitites/Post";
import { ICommentRepository } from "../repositories/CommentRepository";

interface IComment{
    comment?: string,
}
export class EditCommentstService {
    constructor(private commentRespository: ICommentRepository) {}
    async execute(data :IComment,id:string){
        const comment = await this.commentRespository.update(data,id)
        return comment
     }
}