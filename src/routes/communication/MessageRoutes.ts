import express, { Router } from "express";

import { getChatMessages } from "../../controllers/communication/MessageController";



const messageRoutes:Router = express.Router()

messageRoutes.get('/chat',getChatMessages)

export default messageRoutes