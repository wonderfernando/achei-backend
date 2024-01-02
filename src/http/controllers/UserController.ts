import { Request, Response } from "express"
import { UserRepositoryMemory } from "../../repositories/InMemory/UserRepositoryMemory"
import { IUserRepository } from "../../repositories/UserRepository"
import { ListAllusersService } from "../../services/ListAllUsersService"
import { GetProfileById } from "../../services/GetProfileById"
import { ZodError, z } from "zod"
import { UserRepositoryPrisma } from "../../repositories/prisma/UserRepositoryPrisma"
const schemaGetUser = z.object({id: z.string()})
export class UserController {
    private userRepository :IUserRepository
    private  listUsersService: ListAllusersService
    constructor() {
        this.userRepository = new UserRepositoryPrisma()
        this.listUsersService = new ListAllusersService(this.userRepository)
    }

    public list = async (req:Request, res: Response)=>{
        const users = await this.listUsersService.execute()
        res.status(200).send({users})
    }
    
    public get = async (req:Request, res: Response)=>{
        try {
             const {id} = schemaGetUser.parse(req.body)
             const user= await new GetProfileById(this.userRepository).execute(id)
             res.status(200).send({user})
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send({error: error.issues})
            }
            res.status(500).send({error: "internal server error"})
        }
       
       
    }
    
}