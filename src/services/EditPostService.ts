import { IPost } from "../entitites/Post";
import { ResourceDontExist } from "../errors/ResourceDontExists";
import { IPostRepository } from "../repositories/PostRepository";

interface IPostData{
     type?:string|null,
    name?:string|null,
    description?:string|null,
    img?: string|null,
    img2?: string|null,
    contact1?: string|null,
    contact2?: string|null,
    user_id?: string|null,
    latitude?: number|null,
    longitude?: number|null,
    gender?: string|null,
    status?: string|null,
    age_id?:string|null,
    disaperAt?: Date|string|null,
    foundAt?: Date|string|null,
    localFound?: string|null,
    localDisaper?:string|null,
    city_id?: string|null, 
     
}
export class EditPostService {
    constructor(private postRepository : IPostRepository) {}
    async execute(data: Partial<IPost>, id :string){
        const post = await this.postRepository.findById(id)
        if (!post) {
            throw new ResourceDontExist()
        }
       
        return await this.postRepository.update(data, id)
    }
}