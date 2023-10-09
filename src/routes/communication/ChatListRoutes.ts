import express, { Router } from "express";
import { addChatList, getBySenderId } from "../../controllers/communication/ChatListController";



const chatListRoutes:Router = express.Router()

chatListRoutes.post('/save',addChatList)
chatListRoutes.get('/:senderId',getBySenderId)

export default chatListRoutes