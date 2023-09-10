import * as jwt from 'jsonwebtoken'

import dotenv from 'dotenv';
dotenv.config();
const fetchUser = (req, res, next) => {

    const token = req.header('auth-token')

    if (!token)
        res.status(401).send({ error: 'Token not valide' })

    try {
        const data = jwt.verify(token, process.env.JWT_SECERT)
        req['user'] = data['user'].id
        next()
    } catch (error) {
         res.status(401).send({ error: "Authenication failed!" })
    }

}

export default fetchUser