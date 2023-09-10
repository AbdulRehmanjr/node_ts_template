import {connectToMongoDb}  from './database/database'
import express from 'express'
import userRoutes from './routes/UserRoute'

//* database connection
connectToMongoDb()

const app = express()
const PORT:number = 3000

//* routes
app.use(express.json())
app.use('/api/user',userRoutes)
app.get('/',(req,res)=>{
    res.send('hello')
})
app.listen(PORT,()=>{
    console.log(`Service is running at http://localhost:${PORT}`)
})