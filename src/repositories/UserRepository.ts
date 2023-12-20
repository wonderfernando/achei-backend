import { IUser } from "../entitites/User";
import { IBaseRepository } from "./BaseRepository";

export interface IUserRepository extends IBaseRepository<IUser>{
    findByEmail: (email:string) => Promise<IUser|null>
}