import express from "express"
import {Prisma, PrismaClient} from "@prisma/client"
const app = express()
import {routes as userRoutes} from "./http/routes/auth.routes"

app.use(express.json())
app.use("/",userRoutes) 
export {app}