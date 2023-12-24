import { describe, expect, it } from "vitest";
import { PostRepositoryInMemory } from "../src/repositories/InMemory/PostRepositoryInMemory";
import { EditPostService } from "../src/services/EditPostService";

describe("edit post", () => {
    it("should be possible edit a post data", async () => {
        const postRepository = new PostRepositoryInMemory()
        const editPostService = new EditPostService(postRepository)
        postRepository.posts.push({id:"123", type:"",name:"gsdg", img:"",contact1:"",contact2:"",user_id:"123",description:"",city_id:"123",age_id:"1",status:"",gender:""})
        
       const post = await editPostService.execute({name:"alberto",city_id:"3"},"123")
        expect(post?.name).toEqual("alberto")
        expect(post?.city_id).toEqual("3")
    })
})