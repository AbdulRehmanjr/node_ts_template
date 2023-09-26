import * as jwt from 'jsonwebtoken'

import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';

dotenv.config();

/**
 * The fetchUser function is a middleware function that verifies the authenticity of a token and sets
 * the user ID in the request object if the token is valid.
 * @param {Request} req - The `req` parameter represents the HTTP request object, which contains
 * information about the incoming request such as headers, query parameters, and request body.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code, sending data, and setting headers.
 * @param {NextFunction} next - The `next` parameter is a function that is used to pass control to the
 * next middleware function in the request-response cycle. It is typically used to move to the next
 * middleware function after the current middleware function has completed its task.
 */
const fetchUser =  (req:Request, res:Response, next:NextFunction) => {

    const auth = req.header('Authorization')
    const token = auth.split(' ')[1]
    if (!token){
        
        res.status(401).send({ error: 'Token not valide' })
    }
        
    try {
        const data = jwt.verify(token, process.env.JWT_SECERT)
        req['user'] = data['user'].id
        next()
    } catch (error) {
         res.status(401).send({ error: "Authenication failed!" })
         next()
    }

}

export default fetchUser