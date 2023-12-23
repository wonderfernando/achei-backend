import { describe, expect, it } from "vitest";
import { UserRepositoryMemory } from "../src/repositories/InMemory/UserRepositoryMemory";
import { GetProfileById } from "../src/services/GetProfileById";
import { hash } from "bcryptjs";
import { ResourceDontExist } from "../src/errors/ResourceDontExists";

describe("user profile tests", () => {
    it("should be possible get a profile by user id",async () => {
        const userRepository = new UserRepositoryMemory()
        userRepository.users.push({id:"123",name:"Fernando",password:await hash("123",1),email:"fernanod@gmail.com",city_id:"", admin:false,phone:""})
        const getProfileById = new GetProfileById(userRepository)
        const user = await getProfileById.execute("123")
        expect(user.name).toEqual("Fernando")  
    })

    it("should not be possible get a profile that not exists ",async () => {
        const userRepository = new UserRepositoryMemory()
        const getProfileById = new GetProfileById(userRepository)
        await expect(getProfileById.execute("123")).rejects.toBeInstanceOf(ResourceDontExist)  
    })

})