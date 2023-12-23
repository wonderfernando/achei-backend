import { describe, expect, it } from "vitest";
import { UserRepositoryMemory } from "../src/repositories/InMemory/UserRepositoryMemory";
import { UserRegisterService } from "../src/services/UserRegisterService";
import { UserAuthService } from "../src/services/UserAuthService";
import { hash } from "bcryptjs";
import { ResourceDontExist } from "../src/errors/ResourceDontExists";
import { EditProfileService } from "../src/services/EditProfileService";

describe("update profile", () => {
    it("should be possible update profile data", async () => {
        const userRepository = new UserRepositoryMemory()
        const editProfileService = new EditProfileService(userRepository)
        userRepository.users.push({id:"123",name:"Fernando",password:await hash("123",1),email:"fernanod@gmail.com",city_id:"", admin:false,phone:""})
      
       const user = await editProfileService.execute({name:"carlos",email:"jorgeemail"},"123")
        expect(user?.email).toEqual("jorgeemail")
        expect(user?.name).toEqual("carlos")
        
    })
})