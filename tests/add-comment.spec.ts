import { describe, expect, it } from "vitest";
import { CommentRepositoryInMemory } from "../src/repositories/InMemory/CommentRepositoryMemory";
import { UserRepositoryMemory } from "../src/repositories/InMemory/UserRepositoryMemory";
import { AddCommentstService } from "../src/services/AddCommentService";
import { PostRepositoryInMemory } from "../src/repositories/InMemory/PostRepositoryInMemory";
import { ResourceDontExist } from "../src/errors/ResourceDontExists";

describe("add comment", () => {
    it("should be possible add a new comment",async () => {
        const postRepository = new PostRepositoryInMemory()
        const userRepository = new UserRepositoryMemory()
        const commentRepository = new CommentRepositoryInMemory()
        const AddCommentService = new AddCommentstService(commentRepository,postRepository, userRepository)
        userRepository.users.push({id:"123",name:"Fernando",password:"",email:"fernanod@gmail.com",city_id:"", admin:false,phone:""})
        postRepository.posts.push({id:"123", type:"",name:"gsdg", img:"",contact1:"",contact2:"",user_id:"123",description:"",city_id:"123",age_id:"1",status:"",gender:""})
      
        const comment = await AddCommentService.execute({comment:"comentario", user_id:"123",post_id:"123"})
        expect(comment.id).toEqual(expect.any(String))  
    })
    it("should not be possible add a new comment not exist post and user",async () => {
        const postRepository = new PostRepositoryInMemory()
        const userRepository = new UserRepositoryMemory()
        const commentRepository = new CommentRepositoryInMemory()
        const addPostService = new AddCommentstService(commentRepository,postRepository, userRepository)       
        await expect(addPostService.execute({id:"123",user_id:"1",post_id:"2",comment:""})).rejects.toBeInstanceOf(ResourceDontExist)
    })
     
})