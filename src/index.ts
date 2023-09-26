import {connectToMongoDb}  from './database/database'
import express from 'express'

import userRoutes from './routes/UserRoute'
import roleRoutes from './routes/RoleRoute'
import configurations from './security/configuration'
import categoryRoutes from './routes/CategoryRoutes'
import productRoutes from './routes/ProductRoutes'
import sellerRequestRoutes from './routes/seller/SellerRoutes'

//* database connection
connectToMongoDb()

const app = express()

const PORT:number = 3000

app.use(configurations)
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({ extended: true,limit:'limit' }))
// app.use(upload.array()); 

//* routes
app.use('/api/user',userRoutes)
app.use('/api/role',roleRoutes)
app.use('/api/category',categoryRoutes)
app.use('/api/product',productRoutes)
app.use('/api/request',sellerRequestRoutes)

app.listen(PORT,()=>{
    console.log(`Service is running at http://localhost:${PORT}`)
})