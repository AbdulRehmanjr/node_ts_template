import express, { Router } from 'express'
import { UserModel } from '../models/User'
import { body, validationResult } from 'express-validator'
import * as jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();

const userRoutes: Router = express.Router()

userRoutes.get('/', (_req: any, res: any) => {

    res.json("hello")
})

userRoutes.post('/', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 3 })
], (req: any, res: any) => {

    const result = validationResult(req);

    if (!result.isEmpty())
        return res.status(404).json({ error: result.array() })

    
    const user = new UserModel(req.body)
        user.save()
        .then((response)=>{
            const jwt_data = {
                user:{
                    id:  response.id
                }
            }
            const token = jwt.sign(jwt_data,process.env.JWT_SECERT)
            res.status(201).json(token)
        })
        .catch((error:Error)=>res.status(404).json({error:`${error.message}`}))
    
})

export default userRoutes;