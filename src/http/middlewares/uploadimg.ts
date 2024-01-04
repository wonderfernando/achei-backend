import multer from "multer"
import { dirname, resolve } from "path"
const newName = Math.floor(Math.random() * 1000000000) 
export const multerConfig = multer.diskStorage({
    destination: (req,file, callback) => callback(null,resolve(__dirname,"..","..","public","uploads")),
    filename: (req,file,callback) => callback(null, newName+"-"+file.originalname)
})


