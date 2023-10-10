
import { Server, Socket } from 'socket.io';

import dotenv from 'dotenv'
import { Message } from '../../classes/communication/Message';
import logger from '../../Logger';

dotenv.config()

interface IRoom {
    socketId: string
    userId: string
}
export const socketConfig = (server: any) => {

    
    const io: Server = new Server(server, {
        cors: {
            origin: process.env.ORIGIN
        }
    });

    const onlineUsers = new Map()

    const rooms = {};

    io.on('connection', (socket) => {
        console.log('A user connected');


        socket.on('add_user', (userId) => {
            console.log('userId',userId)
            onlineUsers.set(userId,socket.id)
            console.log(onlineUsers)
            console.log(`User ${socket.id} joined room ${userId}`);
        });

        socket.on('send_message', (message) => {

            console.log(onlineUsers)
            console.log('Received message:', message);

            const receiverSocketId = onlineUsers.get(message.receiverId)
            console.log("reciverId",receiverSocketId)
            if (receiverSocketId) {
                // Send the message to the specific receiver
                socket.to(receiverSocketId).emit('receive_message', message);
            }
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });

}