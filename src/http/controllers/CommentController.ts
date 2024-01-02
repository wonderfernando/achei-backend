import { Request, Response } from "express"
import { PostRepositoryInMemory } from "../../repositories/InMemory/PostRepositoryInMemory"
import { ZodError, z } from "zod"
import { ResourceDontExist } from "../../errors/ResourceDontExists"
import { ICommentRepository } from "../../repositories/CommentRepository"
import { ListAllCommentsByPostId } from "../../services/ListAllCommentByPostIdService"
import { AddCommentstService } from "../../services/AddCommentService"
import { UserRepositoryMemory } from "../../repositories/InMemory/UserRepositoryMemory"
import { EditCommentstService } from "../../services/EditCommentService"
import { RemoveCommentService } from "../../services/RemoveCommentService"
import { CommentRepositoryPrisma } from "../../repositories/prisma/CommentRespostoryPrisma"
import { PostRepositoryPrisma } from "../../repositories/prisma/PostRepositoryPrisma"
import { UserRepositoryPrisma } from "../../repositories/prisma/UserRepositoryPrisma"

const  schemaCommentInput = z.object({
   comment: z.string(),
   post_id: z.string()
}) 
export class CommnetController {
    private commentRepository: ICommentRepository

    constructor() {
        this.commentRepository = new CommentRepositoryPrisma()   
       
    }

    public list = async (req: Request, res: Response) => {
       
        const {id} = z.object({id:z.string()}).parse(req.params)
        const comments = await new ListAllCommentsByPostId(this.commentRepository).execute(id)
        return res.status(200).send({comments})
    }
    public get = async (req:Request, res : Response) => {
        try {
            const {id} = z.object({id:z.string()}).parse(req.params)
            const comment = await this.commentRepository.findById(id)
            if (!comment) {
               return res.status(404).send({error: "Resource Not Found"})
            }
            res.send({comment})
        } catch (error) {
            if (error instanceof ZodError) {
              return  res.status(403).send({error: error.issues})
            }
            return res.status(500).send({error: "internal error"})
        }
    }

    public store = async (req:Request, res: Response) => {
        try {
            const data = schemaCommentInput.parse(req.body)
            const iduser = req.id
            const postRepository = new PostRepositoryPrisma()
            const userRepository = new UserRepositoryPrisma()
            const comment = await new AddCommentstService(this.commentRepository,postRepository,userRepository).execute({comment:data.comment, user_id:iduser,post_id: data.post_id})
            return res.status(201).send({comment})
      
        } catch (error) {
            if(error instanceof ZodError) return res.status(403).send({error:error.issues})
            return res.status(500).send({error: "internal error"})
        }
    }
    public update = async (req:Request, res: Response) => {
        try {
            const data = schemaCommentInput.parse(req.body)
            const {id} = z.object({id:z.string()}).parse(req.params)
            const comment = await new EditCommentstService(this.commentRepository).execute(data,id)
            return res.status(200).send({comment})
      
        } catch (error) {
            if(error instanceof ZodError) return res.status(403).send({error:error.issues})
            if(error instanceof ResourceDontExist) return res.status(404).send({error: "Resource Not Found"})

            return res.status(500).send({error: "internal error"})
        }
    }
    public delete = async (req: Request, res: Response) => {
        try {
            const {id} = z.object({id: z.string()}).parse(req.params)
            await new RemoveCommentService(this.commentRepository).execute(id)
            return res.status(200).send()
        } catch (error) {
            if(error instanceof ZodError) return res.status(403).send({error:error.issues})
            if(error instanceof ResourceDontExist) return res.status(404).send({error: "Resource Not Found"})

            return res.status(500).send({error: "internal error"})
        }
    }
    
}