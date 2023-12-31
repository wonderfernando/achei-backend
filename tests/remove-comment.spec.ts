import { describe, expect, it } from "vitest";
import { RemoveCommentService } from "../src/services/RemoveCommentService";
import { CommentRepositoryInMemory } from "../src/repositories/InMemory/CommentRepositoryMemory";
describe("profile delete", () => {
    it("should be possible delete a profile user",async () => {
        const commentRepository = new CommentRepositoryInMemory()
        const removeCommentService = new RemoveCommentService(commentRepository)
        commentRepository.comments.push({id:"123",comment:"",post_id:"123",user_id:""})
        const isDeleted = await removeCommentService.execute("123") 
        expect(isDeleted).toBe(true) 
        expect(commentRepository.comments.length).toBe(0)
    })
    
})