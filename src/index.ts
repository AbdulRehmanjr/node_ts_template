import {connectToMongoDb}  from './database/database'
import express from 'express'
import http, { Server } from 'http'
import configurations from './security/configuration'

import { router } from './routes/IndexRoutes'
import { socketConfig } from './middlewares/communication/SocketIO'



const app = express()
const server :Server = http.createServer(app);
const PORT:number = 3000

//* database connection
connectToMongoDb()
//* socketIO server
socketConfig(server)

app.use(configurations)
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({ extended: true,limit:'limit' }))
app.use(router)

server.listen(PORT,()=>{
    console.log(`Service is running at http://localhost:${PORT}`)
})