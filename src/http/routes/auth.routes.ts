import {Router} from "express"
import { AuthController } from "../controllers/AuthController"
const authController = new AuthController()
console.log("passou")
const routes = Router()

routes.post("/register", authController.register)
routes.post("/login", authController.login)


export {routes}