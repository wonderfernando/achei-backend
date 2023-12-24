import { describe, expect, it } from "vitest";
import { PostRepositoryInMemory } from "../src/repositories/InMemory/PostRepositoryInMemory";
import { UserRepositoryMemory } from "../src/repositories/InMemory/UserRepositoryMemory";
import { AddLikeInPostService } from "../src/services/AddLikeInPostService";
import { LikeRepositoryInMemory } from "../src/repositories/InMemory/LikeRepositoryMemory";
import { ResourceDontExist } from "../src/errors/ResourceDontExists";

describe("add like in pos", () => {
    it("should be possible add a post",async () => {
      const likeRespository = new LikeRepositoryInMemory()
        const postRepository = new PostRepositoryInMemory()
        const userRepository = new UserRepositoryMemory()
        const addLike = new AddLikeInPostService(likeRespository,postRepository, userRepository)
        userRepository.users.push({id:"123",name:"Fernando",password:"",email:"fernanod@gmail.com",city_id:"", admin:false,phone:""})
        postRepository.posts.push({id:"123", name:"", img:"",type:"",contact1:"",contact2:"",user_id:"123",description:"",city_id:"", age_id:"",status:"",gender:""})
        const like = await addLike.execute({post_id:"123",user_id:"123"})
       expect(like.id).toEqual(expect.any(String))  
    })
    it("should not be possible add a like in not exists user",async () => {
        const likeRespository = new LikeRepositoryInMemory()
        const postRepository = new PostRepositoryInMemory()
        const userRepository = new UserRepositoryMemory()
        const addLike = new AddLikeInPostService(likeRespository,postRepository, userRepository)
       await expect(addLike.execute({post_id:"123",user_id:"123"})).rejects.toBeInstanceOf(ResourceDontExist) 
    })
     
})