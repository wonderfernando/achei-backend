import { describe, expect, it } from "vitest";
import { UserRepositoryMemory } from "../src/repositories/InMemory/UserRepositoryMemory";
import { GetProfileById } from "../src/services/GetProfileById";
import { hash } from "bcryptjs";
import { ResourceDontExist } from "../src/errors/ResourceDontExists";
import { ListAllusersService } from "../src/services/ListAllUsersService";

describe("user profile tests", () => {
  

    it("should be possible get all users profiles ",async () => {
        const userRepository = new UserRepositoryMemory()
        const listAllUSersService = new ListAllusersService(userRepository)
        userRepository.users.push({id:"123",name:"Fernando",password:await hash("123",1),email:"fernanod@gmail.com",city_id:"", admin:false,phone:""})
        userRepository.users.push({id:"321",name:"Fernando",password:await hash("123",1),email:"fernanod@gmail.com",city_id:"", admin:false,phone:""})
     
        await expect((await listAllUSersService.execute()).length).toBe(2)
    })

})