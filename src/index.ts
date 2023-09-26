import {connectToMongoDb}  from './database/database'
import express from 'express'

import userRoutes from './routes/user/UserRoute'
import roleRoutes from './routes/user/RoleRoute'
import configurations from './security/configuration'
import categoryRoutes from './routes/business/CategoryRoutes'
import productRoutes from './routes/inverntory/ProductRoutes'
import sellerRequestRoutes from './routes/seller/SellerRoutes'
import { router } from './routes/IndexRoutes'

//* database connection
connectToMongoDb()

const app = express()

const PORT:number = 3000

app.use(configurations)
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({ extended: true,limit:'limit' }))
app.use(router)

app.listen(PORT,()=>{
    console.log(`Service is running at http://localhost:${PORT}`)
})