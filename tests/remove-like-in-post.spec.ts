import { describe, expect, it } from "vitest";
import { PostRepositoryInMemory } from "../src/repositories/InMemory/PostRepositoryInMemory";
import { AddPostService } from "../src/services/AddPostService";
import { UserRepositoryMemory } from "../src/repositories/InMemory/UserRepositoryMemory";
import { hash } from "bcryptjs";
import { ResourceDontExist } from "../src/errors/ResourceDontExists";
import { LikeRepositoryInMemory } from "../src/repositories/InMemory/LikeRepositoryMemory";
import { RemoveLikeInPostService } from "../src/services/RemoveLikeInPost";

describe("remove like ", () => {
    it("should be able remove like in post",async () => {
      
        const likeRespository = new LikeRepositoryInMemory()
        likeRespository.likes.push({id:"123",user_id:"",post_id:""})
        likeRespository.likes.push({id:"2",user_id:"",post_id:""})
        const removeLikeService = new RemoveLikeInPostService(likeRespository)
        const isDeleted = await removeLikeService.execute("123")
        expect(isDeleted).toBe(true)
        expect(((await likeRespository.list()).length)).toBe(1)
    })

     
})