import {connectToMongoDb}  from './database/database'
import express from 'express'
import multer from 'multer';

import userRoutes from './routes/UserRoute'
import roleRoutes from './routes/RoleRoute'
import configurations from './security/configuration'
import categoryRoutes from './routes/CategoryRoutes'

//* database connection
connectToMongoDb()

const app = express()
/* The code `roleRoutes.post('/role',(req,res)=>{ ... })` is defining a POST route for the '/role'
endpoint. */
const PORT:number = 3000
const upload = multer();

//* routes
app.use(configurations)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(upload.array()); 

// routes

app.use('/api/user',userRoutes)
app.use('/api/role',roleRoutes)
app.use('/api/category',categoryRoutes)
app.get('/',(req,res)=>{
    res.send('hello')
})
app.listen(PORT,()=>{
    console.log(`Service is running at http://localhost:${PORT}`)
})