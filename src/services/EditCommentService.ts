import { hash } from "bcryptjs";
import { IUserRepository } from "../repositories/UserRepository";
import { IUser } from "../entitites/User";
import { ResourceDontExist } from "../errors/ResourceDontExists";
import { IPostRepository } from "../repositories/PostRepository";
import { IPost } from "../entitites/Post";
import { ICommentRepository } from "../repositories/CommentRepository";
import { IComment } from "../entitites/Comment";

 
export class EditCommentstService {
    constructor(private commentRespository: ICommentRepository) {}
    async execute(data :Partial<IComment>,id:string){
        const comment = await this.commentRespository.findById(id)
        if (!comment) {
            throw new ResourceDontExist()
        }
        return  await this.commentRespository.update(data,id)
     }
}