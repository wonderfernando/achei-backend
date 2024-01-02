import { NextFunction, Request, Response } from "express";
import jwt, { Jwt, TokenExpiredError } from "jsonwebtoken";
import { env } from "../../utils/env";
;

 
interface data {
    id:string,
    iat:number,
    exp:number

}
export function tokenValidate(req: Request, res: Response, next: NextFunction) {
    let token = req.headers.authorization
    if(!token) 
    return res.status(401).send({error:"Token is required"})
    
    token = token.split(" ")[1]
    try {
        const decoder = jwt.verify(token,env().JSONTOKEN)    
        req.id = (decoder as data).id
        next()
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return res.status(401).send({error:"Token is expired"}) 
        }
        return res.status(401).send({error:"Token is invalid"}) 
}

}