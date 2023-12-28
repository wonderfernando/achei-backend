import {Router} from "express"
import { AuthController } from "../controllers/AuthController"
import { UserController } from "../controllers/UserController"
import { tokenValidate } from "../middlewares/tokenvalidate"
const authController = new AuthController()
const userController = new UserController()
import multer from "multer"
import { resolve } from "path"
import { multerConfig } from "../middlewares/uploadimg"
const routes = Router()
routes.post("/register", authController.register)
routes.post("/login", authController.login)
routes.post("/token", authController.tokenValidate)


//users
routes.get("/users",tokenValidate, userController.list)
routes.get("/users/:id",tokenValidate, userController.get)



//upload img
const m = multer({storage: multerConfig})
routes.post("/upload", m.single("arquivo") ,(req, res)=>{
   const arquivo = req.file
   console.log(arquivo)
    res.status(201).send("sucesso")
})

export {routes}