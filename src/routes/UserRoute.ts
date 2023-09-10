import express, { Router  } from 'express'
import { UserModel } from '../models/User'
import { createUser } from '../controllers/UserController'
import { body, validationResult } from 'express-validator'
import * as jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs'
import fetchUser from '../middlewares/Auth';

dotenv.config();

const userRoutes: Router = express.Router()


/* The code `userRoutes.post('/', [...], createUser)` is defining a POST route for creating a new user. */
userRoutes.post('/save', [
    body('fistName').isLength({ min: 3 }),
    body('lastName').isLength({min:3}),
    body('email').isEmail(),
    body('password').isLength({ min: 3 })
], createUser)

userRoutes.post('/login', [
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
], async (req, res) => {
    const { email, password } = req.body
    const result = validationResult(req);

    if (!result.isEmpty())
        return res.status(404).json({ error: result.array() })

    const response = await UserModel.findOne({ email })

    if (!response)
        return res.status(404).json({ error: `User not found with email: ${email}` })

    const compare = await bcrypt.compare(password, response.password)

    if (!compare)
        return res.status(404).json({ error: `Provided password is not correct` })

    const jwt_data = {
        user: {
            id: response.id
        }
    }
    const token = jwt.sign(jwt_data, process.env.JWT_SECERT)
    return res.status(201).json({ authToken: token })

})

userRoutes.get('/getUser', fetchUser, async (req, res) => {
    const userId = req['user']
    const user = await UserModel.findById(userId).populate('role').select("-password")
    if (!user)
        return res.status(404).json({ error: `No User Found ${userId}` })

    return res.status(201).json(user)
})

export default userRoutes;