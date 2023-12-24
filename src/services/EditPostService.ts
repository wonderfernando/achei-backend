import { ResourceDontExist } from "../errors/ResourceDontExists";
import { IPostRepository } from "../repositories/PostRepository";

interface IPostData{
    id?:string,
    type?:string,
    name?:string,
    description?:string,
    img?: string,
    img2?: string,
    contact1?: string,
    contact2?: string,
    user_id?: string,
    latitude?: number,
    longitude?: number,
    gender?: string,
    status?: string,
    age_id?:string,
    disaperAt?: Date|string,
    foundAt?: Date|string,
    localFound?: string,
    localDisaper?:string,
    city_id?: string, 
    createdAt?: Date|string,
}
export class EditPostService {
    constructor(private postRepository : IPostRepository) {}
    async execute(data: IPostData, id :string){
        const post = await this.postRepository.findById(id)
        if (!post) {
            throw new ResourceDontExist()
        }
       
        return await this.postRepository.update(data, id)
    }
}