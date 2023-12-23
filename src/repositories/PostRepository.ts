import { IPost } from "../entitites/Post";
import { IBaseRepository } from "./BaseRepository";

export interface IPostRepository extends IBaseRepository<IPost> {
    foundByProvinceId(provinceId:string) : Promise<IPost[]>
}