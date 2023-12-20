import { describe, expect, it } from "vitest";
import { UserRepositoryMemory } from "../src/repositories/InMemory/UserRepositoryMemory";
import { UserRegisterService } from "../src/services/UserRegisterService";
import { UserAuthService } from "../src/services/UserAuthService";
import { hash } from "bcryptjs";

describe("users auth", () => {
    it("should be possible auth a user",async () => {
        const userRepository = new UserRepositoryMemory()
        userRepository.users.push({id:"123",name:"Fernando",password:await hash("123",1),email:"fernanod@gmail.com",city_id:"", admin:false,phone:""})
        const userAuthService = new UserAuthService(userRepository)
        const user = await userAuthService.execute({email:"fernanod@gmail.com",password:"123"})
        expect(user.id).toEqual(expect.any(String))  
    })

    it("should not be possible auth a user that not exists",async () => {
        const userRepository = new UserRepositoryMemory()
        const userAuthService = new UserAuthService(userRepository)
       await expect(userAuthService.execute({email:"fernanod@gmail.com",password:"123"})).rejects.toBeInstanceOf(Error)
    })
})