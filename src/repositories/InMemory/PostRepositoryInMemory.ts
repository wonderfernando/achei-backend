import { randomUUID } from "crypto";
import { IPost } from "../../entitites/Post";
import { IPostRepository } from "../PostRepository";


export class PostRepositoryInMemory implements IPostRepository {
  
    posts: IPost[] = []

    async create (data: IPost) { 
        const newUser = {...data, id: randomUUID()}
        this.posts.push(newUser)    
        return newUser
    };
    async update (data: { [key:string]: any}, id: string) {
        const indexOf = this.posts.findIndex(post => post.id===id)
        const post = this.posts[indexOf]
        this.posts[indexOf] = {...post,...data}
        return this.posts[indexOf]
    }
    async delete (id: string){
        const newUsers = this.posts.filter(user=> user.id!==id) 
        this.posts = newUsers
        return true
    };
    async list(){
        return this.posts
    }
    async findById (id: string){
        const post = this.posts.find(post => post.id===id)
        return post || null
    };
    async findByEmail(email:string){
        null
    };
    async foundByProvinceId(provinceId: string): Promise<IPost[]> {
        const posts = this.posts.filter(post => post.city_id===provinceId)
        return posts
    }
    async foundByAgeId(ageId: string): Promise<IPost[]> {
        const posts = this.posts.filter(post => post.age_id ===ageId)
        return posts
    }
    async searchByName(name: string): Promise<IPost[]> {
        const posts = this.posts.filter(post => post.name.includes(name))
        return posts 
    }
  async search(name: string, provinceId: any, ageId: any): Promise<IPost[]> {
        throw new Error("Method not implemented.");
    }
  
}