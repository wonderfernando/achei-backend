import { describe, expect, it } from "vitest";
import { RemoveCommentService } from "../src/services/RemoveCommentService";
import { CommentRepositoryInMemory } from "../src/repositories/InMemory/CommentRepositoryMemory";
import { ListAllComments } from "../src/services/ListAllCommentService";
import { ListAllCommentsByPostId } from "../src/services/ListAllCommentByPostIdService";
describe("list comments", () => {
    it("should be able list all comments",async () => {
        const commentRepository = new CommentRepositoryInMemory()
        const listAllComments = new ListAllComments(commentRepository)
        commentRepository.comments.push({id:"123",comment:"",post_id:"123",user_id:""})
        expect((await listAllComments.execute()).length).toBe(1)
    })
    it("should be able list all comments by post id",async () => {
        const commentRepository = new CommentRepositoryInMemory()
        const listAllComments = new ListAllCommentsByPostId(commentRepository)
        commentRepository.comments.push({id:"123",comment:"",post_id:"123",user_id:""})
        commentRepository.comments.push({id:"124",comment:"",post_id:"123",user_id:""})
        commentRepository.comments.push({id:"123",comment:"",post_id:"0",user_id:""})
        const comments = await listAllComments.execute("123")
        expect(comments.length).toBe(2)
    })
    
    
})