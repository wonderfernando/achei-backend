import { describe, expect, it } from "vitest";
import { PostRepositoryInMemory } from "../src/repositories/InMemory/PostRepositoryInMemory";
import { RemovePostService } from "../src/services/RemovePostService";
describe("remove post", () => {
    it("should be possible remove post",async () => {
        const postRepository = new PostRepositoryInMemory()
        const removePostService = new RemovePostService(postRepository)
        postRepository.posts.push({id:"123", type:"",name:"gsdg", img:"",contact1:"",contact2:"",user_id:"123",description:"",city_id:"123",age_id:"1",status:"",gender:""})
        const isDeleted = await removePostService.execute("123") 
        expect(isDeleted).toBe(true) 
        expect(postRepository.posts.length).toBe(0)
    })
    
})