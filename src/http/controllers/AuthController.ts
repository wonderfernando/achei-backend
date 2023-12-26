import { Request, Response } from "express";
import {z} from "zod" 
import { UserRegisterService } from "../../services/UserRegisterService";
import { UserRepositoryMemory } from "../../repositories/InMemory/UserRepositoryMemory";
import { LOADIPHLPAPI } from "dns";
import { linkSync } from "fs";
import { ListAllusersService } from "../../services/ListAllUsersService";
import { UserAuthService } from "../../services/UserAuthService";

const schemaValidateLogin = z.object({
    email: z.string().email("email is required!"),
    password: z.string().min(1,"password is required!")
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
    private userAuthService
    constructor(){
        this.userRepository = new UserRepositoryMemory()
        this.userRegisterService = new UserRegisterService(this.userRepository)
        this.userAuthService=  new UserAuthService(this.userRepository)
     }
    public login = async (req: Request, res: Response) => {
      const {email, password} = schemaValidateLogin.parse(req.body)   
      const users = await this.userAuthService.execute()
      res.send({users})
    }
    public register = async (req: Request, res: Response) => {
        const {email, password,admin,city_id,name,phone} = schemaValidateRegister.parse(req.body) 
        const newUser = await this.userRegisterService.execute({email,name,password,admin,city_id,phone})
        return res.status(201).send(newUser)
    }
}