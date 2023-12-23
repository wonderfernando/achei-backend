import { describe, expect, it } from "vitest";
import { PostRepositoryInMemory } from "../src/repositories/InMemory/PostRepositoryInMemory";
import { GetProfileById } from "../src/services/GetProfileById";
import { hash } from "bcryptjs";
import { ResourceDontExist } from "../src/errors/ResourceDontExists";
import { ListAllPostService } from "../src/services/ListAllPostsService";
import { ListAllPostByProvinceId } from "../src/services/ListAllPostByProvinceId";

describe("list posts", () => {

    it("should  be possible get all posts",async () => {
        const postRepository = new PostRepositoryInMemory()
        const listAllPostService = new ListAllPostService(postRepository)
        postRepository.posts.push({id:"123", title:"", img:"",contact1:"",contact2:"",user_id:"123",description:"",city_id:"123",age_id:"",status:"",gender:""})
        postRepository.posts.push({id:"123", title:"", img:"",contact1:"",contact2:"",user_id:"123",description:"",city_id:"", age_id:"",status:"",gender:""})
       
        const posts = await listAllPostService.execute()
        expect(posts.length).toBe(2)
    })

    it("should  be possible get all posts by province id",async () => {
        const postRepository = new PostRepositoryInMemory()
        const listAllPostByProvinceId = new ListAllPostByProvinceId(postRepository)
        postRepository.posts.push({id:"123", title:"", img:"",contact1:"",contact2:"",user_id:"123",description:"",city_id:"123",age_id:"",status:"",gender:""})
        postRepository.posts.push({id:"123", title:"", img:"",contact1:"",contact2:"",user_id:"123",description:"",city_id:"123", age_id:"",status:"",gender:""})
        postRepository.posts.push({id:"123", title:"", img:"",contact1:"",contact2:"",user_id:"123",description:"",city_id:"333", age_id:"",status:"",gender:""})
        const posts = await listAllPostByProvinceId.execute("123")
        expect(posts.length).toBe(2)
    })

})