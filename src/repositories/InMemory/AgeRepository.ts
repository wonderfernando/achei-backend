import { randomUUID } from "crypto";
import { IPost } from "../../entitites/Post";
import { IPostRepository } from "../PostRepository";
import { IAgeRepository } from "../AgeRepository";


export class AgeRepositoryInMemory implements IAgeRepository {

    ages: IAge[] = []

    async create (data: IAge) { 
        const newAge = {...data, id: randomUUID()}
        this.ages.push(newAge)    
        return newAge
    };
    async update (data: IAge, id: string) {
        const indexOf = this.ages.findIndex(age => age.id===id)
        this.ages[indexOf] = data
        return data
    }
    async delete (id: string){
        const newAges = this.ages.filter(age=> age.id===id) 
        this.ages = newAges
        return true
    };
    async list(){
        return this.ages
    }
    async findById (id: string){
        const age = this.ages.find(age => age.id===id)
        return age || null
    };
   
    
  
}