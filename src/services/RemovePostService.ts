import {ResourceDontExist} from "../errors/ResourceDontExists"

import { IPostRepository } from "../repositories/PostRepository";
export class RemovePostService {
    constructor(private postRepository: IPostRepository){}
    
    async execute(id: string){
        const post =  await this.postRepository.findById(id)
        if (!post)
            throw new ResourceDontExist()
        const isDeleted = await this.postRepository.delete(id)
        return isDeleted    
    }
}