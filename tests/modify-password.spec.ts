import { describe, expect, it } from "vitest";
import { UserRepositoryMemory } from "../src/repositories/InMemory/UserRepositoryMemory";
import { GetProfileById } from "../src/services/GetProfileById";
import { compare, hash } from "bcryptjs";
import { ChangePasswordService } from "../src/services/ChangePasswordService";

describe("change password", () => {
    it("should be possible change the password",async () => {
        const userRepository = new UserRepositoryMemory()
        userRepository.users.push({id:"123",name:"Fernando",password:await hash("123",1),email:"fernanod@gmail.com",city_id:"", admin:false,phone:""})
        const changePasswordService = new ChangePasswordService(userRepository)
        const user = await changePasswordService.execute({user_id:"123", newPassword:"4321"})
        const isEqual = await compare("4321",user?.password!)
        expect(isEqual).toBe(true)
    })
})