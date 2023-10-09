import { Request, Response, NextFunction } from "express";
import { ChatListModel } from "../../models/communication/ChatList";
import { UserModel } from "../../models/User";

interface IChat {
    sender: string;
    receiver: string;
}

export const getBySenderId = async (req: Request, res: Response, _next: NextFunction) =>{

    
    const {senderId} = req.params

    const response = await ChatListModel.findOne({user:senderId}).populate('list',"-password -date -role ")

    if(response)
        return res.status(201).json(response)
    return res.status(404).json({error:"Product Not Found"})
}
export const addChatList = async (req: Request, res: Response, _next: NextFunction) => {
    const data: IChat = req.body;
    console.log(data)

    try {
        
        // Check if the user's chat list exists, then modify it; else, create a new one
        let senderChatList = await ChatListModel.findOne({ user: data.sender });
        if (!senderChatList) {
            senderChatList = new ChatListModel({ user: data.sender, list: [] });
        }

        // Check if the receiver's chat list exists, then modify it; else, create a new one
        let receiverChatList = await ChatListModel.findOne({ user: data.receiver });
        if (!receiverChatList) {
            receiverChatList = new ChatListModel({ user: data.receiver, list: [] });
        }
        
        const sender = await UserModel.findById(data.sender);
        const receiver = await UserModel.findById(data.receiver);
        
      
        console.log(sender,receiver)
        if (!sender || !receiver) {
            return res.status(404).json({ error: "Sender or receiver user not found" });
        }

        // Check if the receiver is already in the sender's chat list
        const isReceiverInSenderChatList = senderChatList.list.includes(receiver._id);

        if (!isReceiverInSenderChatList) {
            // If the receiver is not in the sender's chat list, add them
            senderChatList.list.push(receiver._id);
        }

        // Check if the sender is already in the receiver's chat list
        const isSenderInReceiverChatList = receiverChatList.list.includes(sender._id);

        if (!isSenderInReceiverChatList) {
            // If the sender is not in the receiver's chat list, add them
            receiverChatList.list.push(sender._id);
        }

        // Save or update both chat lists
        await senderChatList.save();
        await receiverChatList.save();

        return res.status(200).json({ message: "Chat lists updated successfully" });
    } catch (error) {
        console.error("Error adding to chat lists:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
