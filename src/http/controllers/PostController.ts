import { Request, Response } from "express"
import { PostRepositoryInMemory } from "../../repositories/InMemory/PostRepositoryInMemory"
import { IPostRepository } from "../../repositories/PostRepository"
import { ZodError, z } from "zod"
import { RemovePostService } from "../../services/RemovePostService"
import { ResourceDontExist } from "../../errors/ResourceDontExists"
import { EditPostService } from "../../services/EditPostService"
import { ListAllPostService } from "../../services/ListAllPostsService"
import { AddPostService } from "../../services/AddPostService"
import { UserRepositoryMemory } from "../../repositories/InMemory/UserRepositoryMemory"
import { PostRepositoryPrisma } from "../../repositories/prisma/PostRepositoryPrisma"
import { UserRepositoryPrisma } from "../../repositories/prisma/UserRepositoryPrisma"

const  schemaPostInput = z.object({
    type:z.string(),
    name:z.string(),
    description:z.string(),
    contact1: z.string(),
    contact2: z.string().nullable(),
    latitude: z.number().nullable(),
    longitude: z.number().nullable(),
    gender: z.string(),
    age_id:z.string(),
    disaperAt: z.string().nullable(),
    foundAt: z.string().nullable(),
    localFound: z.string().nullable(),
    localDisaper:z.string().nullable(),
    city_id: z.string(), 
}) 
export class PostController {
    private postRepository: IPostRepository

    constructor() {
        this.postRepository = new PostRepositoryPrisma()    
    }

    public list = async (req: Request, res: Response) => {
        const posts = await new ListAllPostService(this.postRepository).execute()
        return res.status(200).send({posts})
    }
    public get = async (req:Request, res : Response) => {
        try {
            const {id} = z.object({id:z.string()}).parse(req.params)
            const post = await this.postRepository.findById(id)
            if (!post) {
               return res.status(404).send({error: "Resource Not Found"})
            }
            res.send({post})
        } catch (error) {
            if (error instanceof ZodError) {
              return  res.status(403).send({error: error.issues})
            }
            return res.status(500).send({error: "internal error"})
        }
    }

    public store = async (req:Request, res: Response) => {
           const data = schemaPostInput.parse(req.body)
            const idUser = req.id
            console.log(idUser)
            const userRepository = new UserRepositoryPrisma()
            const post = await new AddPostService(this.postRepository,userRepository).execute({name: data.name,age_id:data.age_id, city_id: data.city_id,contact1: data.contact1, description: data.description,gender: data.gender,img:"",status:"",type:data.type,user_id:idUser,foundAt: data.foundAt, localFound: data.localFound, localDisaper: data.localDisaper,contact2: data.contact2,img2:null,disaperAt: data.disaperAt,latitude:data.latitude,longitude: data.longitude}) 
            return res.status(201).send({post})
         
    }
    public update = async (req:Request, res: Response) => {
        try {
            const data = schemaPostInput.parse(req.body)
            const {id} = z.object({id:z.string()}).parse(req.params)

            const post = await new EditPostService(this.postRepository).execute(data,id)
            return res.status(200).send({post})
      
        } catch (error) {
            if(error instanceof ZodError) return res.status(403).send({error:error.issues})
            if(error instanceof ResourceDontExist) return res.status(404).send({error: "Resource Not Found"})

            return res.status(500).send({error: error})
        }
    }
    public delete = async (req: Request, res: Response) => {
        try {
            const {id} = z.object({id: z.string()}).parse(req.params)
            await new RemovePostService(this.postRepository).execute(id)
            return res.status(200).send()
        } catch (error) {
            if(error instanceof ZodError) return res.status(403).send({error:error.issues})
            if(error instanceof ResourceDontExist) return res.status(404).send({error: "Resource Not Found"})

            return res.status(500).send({error: "internal error"})
        }
    }
    
}