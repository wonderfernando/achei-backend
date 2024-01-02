import { Request, Response } from "express";
import {ZodError, z} from "zod" 
import { UserRegisterService } from "../../services/UserRegisterService";
import { UserRepositoryMemory } from "../../repositories/InMemory/UserRepositoryMemory";
import { UserAuthService } from "../../services/UserAuthService";
import { ResourceDontExist } from "../../errors/ResourceDontExists";
import "dotenv/config"
import jwt from "jsonwebtoken"
import { GetProfileById } from "../../services/GetProfileById";
import { UserRepositoryPrisma } from "../../repositories/prisma/UserRepositoryPrisma";
const schemaValidateLogin = z.object({
    email: z.string().email("email is required!"),
    password: z.string().min(1,"password is required!")
})
const schemaValidateToken = z.object({
   token: z.string().min(1, "token is required")
})
const schemaValidateRegister = z.object({
    email: z.string().email("email is required!"),
    password: z.string().min(1,"password is required!"),
    name: z.string().min(1,"name is required"),
    phone:z.string().min(1,"phone is required"),
    admin:z.boolean(),
    city_id:z.string()
})

export class AuthController {
    private userRepository
    private userRegisterService 
    private userAuthService : UserAuthService
    constructor(){
        this.userRepository = new UserRepositoryPrisma()
        this.userRegisterService = new UserRegisterService(this.userRepository)
        this.userAuthService=  new UserAuthService(this.userRepository)
     }
     public tokenValidate = async (req:Request, res:Response)=>{
        try {
            const {token} = schemaValidateToken.parse(req.body)
            jwt.verify(token,process.env.JSONTOKEN!, async(err,decoded:any)=>{
                if(err) return res.status(401).send({error:"token invalidate"}) 
                 const id=decoded.id
                const user = await new GetProfileById(this.userRepository).execute(id)
                res.status(200).send({user}) 
            })
         
            } catch (error) {
                if (error instanceof ZodError) {
                    res.status(403).send({error: error.issues}) 
                }
                res.status(401).send({error:error}) 
        }
        
     }
    public login = async (req: Request, res: Response) => {
      try { 
            const {email, password} = schemaValidateLogin.parse(req.body)   
            const user = await this.userAuthService.execute({email,password})
            const token = jwt.sign({id:user.id}, process.env.JSONTOKEN!, {expiresIn: "1h"})
            res.status(200).send({user,token})
        } catch (err) {
            if (err instanceof ResourceDontExist) {
                 res.status(401).send({error:"senha ou email errado"}) 
            } 
            if (err instanceof ZodError) {
                res.status(403).send({error: err.issues}) 
            }
            res.status(500).send()
        }
     
    }
    public register = async (req: Request, res: Response) => {
        
        try{
            const {email, password,admin,city_id,name,phone} = schemaValidateRegister.parse(req.body) 
            const newUser = await this.userRegisterService.execute({email,name,password,admin,city_id,phone})
            const token = jwt.sign({id: newUser.id}, process.env.JSONTOKEN!, {expiresIn: "1h"})
            return res.status(201).send({newUser,token})
   
        }catch(err){
            if (err instanceof ZodError) {
                res.status(403).send({error: err.issues}) 
            }
            res.status(500).send({error: "internal error"}) 
      
        }
      }
}