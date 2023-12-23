import { describe, expect, it } from "vitest";
import { UserRepositoryMemory } from "../src/repositories/InMemory/UserRepositoryMemory";
import { UserRegisterService } from "../src/services/UserRegisterService";
import { hash } from "bcryptjs";
import { DeleteProfileService } from "../src/services/DeleteProfile";
import { ResourceDontExist } from "../src/errors/ResourceDontExists";
describe("profile delete", () => {
    it("should be possible delete a profile user",async () => {
        const userRepository = new UserRepositoryMemory()
        const deleteProfile = new DeleteProfileService(userRepository)
        userRepository.users.push({id:"123",name:"Fernando",password:await hash("123",1),email:"fernanod@gmail.com",city_id:"", admin:false,phone:""})
        const isDeleted = await deleteProfile.execute("123") 
        expect(isDeleted).toBe(true) 
    })
    it("should not be possible delete a profile user",async () => {
        const userRepository = new UserRepositoryMemory()
        const deleteProfile = new DeleteProfileService(userRepository)
        await expect(deleteProfile.execute("123")).rejects.toBeInstanceOf(ResourceDontExist) 
    })
})