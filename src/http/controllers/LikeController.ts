import { Request, Response } from "express"
import { PostRepositoryInMemory } from "../../repositories/InMemory/PostRepositoryInMemory"
import { ZodError, z } from "zod"
import { ResourceDontExist } from "../../errors/ResourceDontExists"
import { UserRepositoryMemory } from "../../repositories/InMemory/UserRepositoryMemory"
import { ILikeRepository } from "../../repositories/LikeRepository"
import { AddLikeInPostService } from "../../services/AddLikeInPostService"
import { RemoveLikeInPostService } from "../../services/RemoveLikeInPost"
import { ListAllLikeInPostService } from "../../services/ListAllLikeInPostService"
import { LikeRepositoryIPrisma } from "../../repositories/prisma/LikeRepositoryPrisma"
import { UserRepositoryPrisma } from "../../repositories/prisma/UserRepositoryPrisma"
import { PostRepositoryPrisma } from "../../repositories/prisma/PostRepositoryPrisma"

const  schemaLikeInput = z.object({
    id: z.string(), 
}) 
export class LikeController {
    private likeRepository: ILikeRepository

    constructor() {
        this.likeRepository = new LikeRepositoryIPrisma()    
    }

    public list = async (req: Request, res: Response) => {
        try {
            const {id} = z.object({id: z.string()}).parse(req.params)
            const postRepository = new PostRepositoryPrisma() 
            const likes = await new ListAllLikeInPostService(this.likeRepository,postRepository).execute(id)
            return res.status(200).send({likes})
        } catch (error) {
            if (error instanceof ZodError) {
                return  res.status(403).send({error: error.issues})
            }
            if (error instanceof ResourceDontExist) {
                return  res.status(403).send({error: error.message})
            }
            return  res.status(403).send({error: "internal error"})  
        } 
    }
        
    public get = async (req:Request, res : Response) => {
        try {
            const {id} = z.object({id:z.string()}).parse(req.params)
            const like = await this.likeRepository.findById(id)
            if (!like) {
               return res.status(404).send({error: "Resource Not Found"})
            }
            res.send({like})
        } catch (error) {
            if (error instanceof ZodError) {
              return  res.status(403).send({error: error.issues})
            }
            return res.status(500).send({error: "internal error"})
        }
    }

    public store = async (req:Request, res: Response) => {
        try {
            const {id: idPost} = schemaLikeInput.parse(req.params)
            const idUser = req.id
            const userRepository = new UserRepositoryPrisma()
            const postRepository = new PostRepositoryPrisma()
            const like = await new AddLikeInPostService(
                this.likeRepository,postRepository,userRepository).execute({
                    user_id: idUser,
                    post_id:idPost,
                }) 
            return res.status(201).send({like})
      
        } catch (error) {
            if(error instanceof ZodError) return res.status(403).send({error:error.issues})
            if(error instanceof ResourceDontExist) return res.status(404).send({error: "Resource Not Found"})
            return res.status(500).send({error: "internal error"})
        }
    }
     
    public delete = async (req: Request, res: Response) => {
        try {
            const {id} = z.object({id: z.string()}).parse(req.params)
            await new RemoveLikeInPostService(this.likeRepository).execute(id)
            return res.status(200).send()
        } catch (error) {
            if(error instanceof ZodError) return res.status(403).send({error:error.issues})
            if(error instanceof ResourceDontExist) return res.status(404).send({error: "Resource Not Found"})

            return res.status(500).send({error: "internal error"})
        }
    }
    
}