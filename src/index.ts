import {connectToMongoDb}  from './database/database'
import express from 'express'
import userRoutes from './routes/UserRoute'
import roleRoutes from './routes/RoleRoute'

//* database connection
connectToMongoDb()

const app = express()
/* The code `roleRoutes.post('/role',(req,res)=>{ ... })` is defining a POST route for the '/role'
endpoint. */
const PORT:number = 3000

//* routes
app.use(express.json())
app.use('/api/user',userRoutes)
app.use('/api/role',roleRoutes)
app.get('/',(req,res)=>{
    res.send('hello')
})
app.listen(PORT,()=>{
    console.log(`Service is running at http://localhost:${PORT}`)
})