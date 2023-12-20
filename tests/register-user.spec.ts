import { describe, expect, it } from "vitest";
import { UserRepositoryMemory } from "../src/repositories/InMemory/UserRepositoryMemory";
import { UserRegisterService } from "../src/services/UserRegisterService";

describe("users tests", () => {
    it("should be possible register a new user",async () => {
        const userRepository = new UserRepositoryMemory()
        const userRegisterService = new UserRegisterService(userRepository)
        const user = await userRegisterService.execute({name:"Fernando",email:"fernanod@gmail.com",password:"12345",admin:false,phone:"123", city_id:"123"})
        console.log(user)
        expect(user.name).toEqual(expect.any(String))  
    })
})