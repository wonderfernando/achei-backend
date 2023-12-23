import { describe, expect, it } from "vitest";
import { PostRepositoryInMemory } from "../src/repositories/InMemory/PostRepositoryInMemory";
import { GetProfileById } from "../src/services/GetProfileById";
import { hash } from "bcryptjs";
import { ResourceDontExist } from "../src/errors/ResourceDontExists";
import { ListAllPostService } from "../src/services/ListAllPostsService";
import { ListAllPostByProvinceId } from "../src/services/ListAllPostByProvinceId";
import { ListAllPostByAgeId } from "../src/services/ListPostByAgeId";
import { ListAllPostByNameService } from "../src/services/ListAllPostByNameService";

describe("list posts", () => {

    it("should  be possible get all posts",async () => {
        const postRepository = new PostRepositoryInMemory()
        const listAllPostService = new ListAllPostService(postRepository)
        postRepository.posts.push({id:"123", name:"",type:"",img:"",contact1:"",contact2:"",user_id:"123",description:"",city_id:"123",age_id:"",status:"",gender:""})
        postRepository.posts.push({id:"123", name:"", img:"",type:"",contact1:"",contact2:"",user_id:"123",description:"",city_id:"", age_id:"",status:"",gender:""})
       
        const posts = await listAllPostService.execute()
        expect(posts.length).toBe(2)
    })

    it
    ("should  be possible get all posts by province id",async () => {
        const postRepository = new PostRepositoryInMemory()
        const listAllPostByProvinceId = new ListAllPostByProvinceId(postRepository)
        postRepository.posts.push({id:"123",type:"", name:"", img:"",contact1:"",contact2:"",user_id:"123",description:"",city_id:"123",age_id:"",status:"",gender:""})
        postRepository.posts.push({id:"123", name:"",type:"", img:"",contact1:"",contact2:"",user_id:"123",description:"",city_id:"123", age_id:"",status:"",gender:""})
        postRepository.posts.push({id:"123", name:"", img:"",type:"",contact1:"",contact2:"",user_id:"123",description:"",city_id:"333", age_id:"",status:"",gender:""})
        const posts = await listAllPostByProvinceId.execute("123")
        expect(posts.length).toBe(2)
    })
    it("should  be possible get all posts by age id",async () => {
        const postRepository = new PostRepositoryInMemory()
        const listAllPostByAgeId = new ListAllPostByAgeId(postRepository)
        postRepository.posts.push({id:"123", type:"",name:"", img:"",contact1:"",contact2:"",user_id:"123",description:"",city_id:"123",age_id:"1",status:"",gender:""})
        postRepository.posts.push({id:"123", name:"",type:"", img:"",contact1:"",contact2:"",user_id:"123",description:"",city_id:"123", age_id:"1",status:"",gender:""})
        postRepository.posts.push({id:"123", name:"", img:"",type:"",contact1:"",contact2:"",user_id:"123",description:"",city_id:"333", age_id:"121",status:"",gender:""})
        const posts = await listAllPostByAgeId.execute("1")
        expect(posts.length).toBe(2)
    })
    it("should  be possible get all posts by name",async () => {
        const postRepository = new PostRepositoryInMemory()
        const listAllPostByNameService = new ListAllPostByNameService(postRepository)
        postRepository.posts.push({id:"123", type:"",name:"gsdg", img:"",contact1:"",contact2:"",user_id:"123",description:"",city_id:"123",age_id:"1",status:"",gender:""})
        postRepository.posts.push({id:"123", name:"fernando",type:"", img:"",contact1:"",contact2:"",user_id:"123",description:"",city_id:"123", age_id:"1",status:"",gender:""})
        postRepository.posts.push({id:"123", name:"fernando carlos", img:"",type:"",contact1:"",contact2:"",user_id:"123",description:"",city_id:"333", age_id:"121",status:"",gender:""})
        const posts = await listAllPostByNameService.execute("fer")
        expect(posts.length).toBe(2)
    })

})