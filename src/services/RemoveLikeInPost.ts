import { ResourceDontExist } from "../errors/ResourceDontExists";
import { ILikeRepository } from "../repositories/LikeRepository";
 
export class RemoveLikeInPostService {
    constructor(private likeRespository:ILikeRepository) {}
    async execute(id:string){
        const like = await this.likeRespository.findById(id)
       if (!like) {
            throw new ResourceDontExist()
       }
        return this.likeRespository.delete(id)
     }
}