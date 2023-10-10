
import { Server } from 'socket.io';

import dotenv from 'dotenv'
import { Message } from '../../classes/communication/Message';
import { MessageModel } from '../../models/communication/Message';


dotenv.config()

export const socketConfig = (server: any) => {

    
    const io: Server = new Server(server, {
        cors: {
            origin: process.env.ORIGIN
        }
    });

    const onlineUsers = new Map()

    io.on('connection', (socket) => {
        

        socket.on('add_user', (userId) => {
            onlineUsers.set(userId,socket.id)
            console.log(onlineUsers)
        });

        socket.on('send_message', async (message:Message) => {
            const respone = new MessageModel(message)
            await respone.save()
            const receiverSocketId = onlineUsers.get(message.receiverId)
            if (receiverSocketId) 
                socket.to(receiverSocketId).emit('receive_message', message);
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });

}