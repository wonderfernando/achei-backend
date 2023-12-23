import { IUserRepository } from "../repositories/UserRepository";
import {ResourceDontExist} from "../errors/ResourceDontExists"
import { ICommentRepository } from "../repositories/CommentRepository";
export class RemoveCommentService {
    constructor(private commentRepository: ICommentRepository){}
    
    async execute(id: string){
        const comment =  await this.commentRepository.findById(id)
        if (!comment)
            throw new ResourceDontExist()
        const isDeleted = await this.commentRepository.delete(id)
        return isDeleted    
    }
}