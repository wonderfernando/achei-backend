import { NextFunction, Request, Response } from "express";
import jwt, { Jwt } from "jsonwebtoken";
import { env } from "../../utils/env";
;

 
interface data {
    id:string
}
export function tokenValidate(req: Request, res: Response, next: NextFunction) {
    let token = req.headers.authorization
    if(!token) 
    return res.status(401).send({error:"Token is required"})
    
    token = token.split(" ")[1]

    jwt.verify(token,env().JSONTOKEN, (err, decoder ) => { 
        if(err) return res.status(401).send({error:"Token is invalid"}) 
        if(decoder) req.id = (decoder as data).id
        console.log(decoder)
        next()
        })  
}