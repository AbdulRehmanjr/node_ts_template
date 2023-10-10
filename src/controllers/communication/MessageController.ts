import { NextFunction, Request, Response } from "express";
import { Message } from "../../classes/communication/Message";
import { MessageModel } from "../../models/communication/Message";



export const getChatMessages = async (req:Request,res:Response,next:NextFunction)=>{

    const sender = req.query.sender
    const receiver = req.query.receiver

    const messages= await MessageModel.find({
        $or: [
          { senderId: sender, receiverId: receiver },
          { senderId: receiver, receiverId: sender },
        ],
      }).sort({ time: 1 })
    
      if(messages)
        return res.status(201).json(messages)
      return res.status(404).json({error:'No Message Found'})
}   