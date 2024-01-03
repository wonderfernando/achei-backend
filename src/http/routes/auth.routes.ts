import {Router} from "express"
import { AuthController } from "../controllers/AuthController"
import { UserController } from "../controllers/UserController"
import { tokenValidate } from "../middlewares/tokenvalidate"
const authController = new AuthController()
const userController = new UserController()
const postController = new PostController()
const commentController = new CommnetController()
import multer from "multer"
import { resolve } from "path"
import { multerConfig } from "../middlewares/uploadimg"
import { PostController } from "../controllers/PostController"
import { CommnetController } from "../controllers/CommentController"
const routes = Router()
routes.post("/register", authController.register)
routes.post("/login", authController.login)
routes.post("/token", authController.tokenValidate)
routes.use("/",tokenValidate)



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


routes.get("/posts", postController.list)
routes.get("/posts/:id", postController.get)
routes.post("/posts", postController.store)
routes.put("/posts/:id", postController.update)
routes.delete("/posts/:id", postController.delete)

routes.get("/posts/:id/comments", commentController.list)
routes.get("/posts/comments/:id", commentController.get)
routes.post("/posts/:id/comments", commentController.store)
routes.put("/posts/comments/:id", commentController.update)
routes.delete("/posts/comments/:id", commentController.delete)
export {routes}