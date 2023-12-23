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
    async update (data: IPost, id: string) {
        const indexOf = this.posts.findIndex(user => user.id===id)
        this.posts[indexOf] = data
        console.log("-----",data)
        return data
    }
    async delete (id: string){
        const newUsers = this.posts.filter(user=> user.id===id) 
        this.posts = newUsers
        return true
    };
    async list(){
        return this.posts
    }
    async findById (id: string){
        const user = this.posts.find(user => user.id===id)
        return user || null
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

}