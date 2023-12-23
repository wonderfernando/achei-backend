import { describe, expect, it } from "vitest";
import { PostRepositoryInMemory } from "../src/repositories/InMemory/PostRepositoryInMemory";
import { AddPostService } from "../src/services/AddPostService";
import { UserRepositoryMemory } from "../src/repositories/InMemory/UserRepositoryMemory";
import { hash } from "bcryptjs";
import { ResourceDontExist } from "../src/errors/ResourceDontExists";

describe("add post", () => {
    it("should be possible add a new post",async () => {
        const postRepository = new PostRepositoryInMemory()
        const userRepository = new UserRepositoryMemory()
        const addPostService = new AddPostService(postRepository, userRepository)
        userRepository.users.push({id:"123",name:"Fernando",password:await hash("123",1),email:"fernanod@gmail.com",city_id:"", admin:false,phone:""})
     
        const post = await addPostService.execute({id:"123", type:"",name:"gsdg", img:"",contact1:"",contact2:"",user_id:"123",description:"",city_id:"123",age_id:"1",status:"",gender:""})
        expect(post.id).toEqual(expect.any(String))  
    })
    it("should not be possible add a new post not exist user",async () => {
        const postRepository = new PostRepositoryInMemory()
        const userRepository = new UserRepositoryMemory()
        const addPostService = new AddPostService(postRepository, userRepository)
       await expect(addPostService.execute({id:"123", type:"",name:"gsdg", img:"",contact1:"",contact2:"",user_id:"123",description:"",city_id:"123",age_id:"1",status:"",gender:""})).rejects.toBeInstanceOf(ResourceDontExist) 
    })
     
})