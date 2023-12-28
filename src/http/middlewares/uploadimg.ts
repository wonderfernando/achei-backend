import multer from "multer"
import { dirname, resolve } from "path"

export const multerConfig = multer.diskStorage({
    destination: (req,file, callback) => callback(null,resolve(__dirname,"..","..","public","uploads")),
    filename: (req,file,callback) => callback(null, file.originalname)
})


