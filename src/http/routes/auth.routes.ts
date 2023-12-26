import {Router} from "express"
import { AuthController } from "../controllers/AuthController"
const authController = new AuthController()
const routes = Router()

routes.post("/register", authController.register)
routes.get("/login", authController.login)


export {routes}