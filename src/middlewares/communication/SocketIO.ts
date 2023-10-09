
import { Server, Socket } from 'socket.io';

import dotenv from 'dotenv'

dotenv.config()

export const socketConfig = (server: any) => {
    const io: Server = new Server(server,{
        cors:{
            origin:process.env.ORIGIN
        }
    });

    io.on('connection', (socket: Socket) => {
        console.log('A user connected');

        // socket.on('send_message', async (data: { text: string; user: string }) => {
        //     const { text, user } = data;
        //     // Handle your message logic and emit messages as needed.
        //     io?.emit('receive_message', { text, user });
        // });

        // socket.on('disconnect', () => {
        //     console.log('A user disconnected');
        // });

        socket.on('disconnect',(reason)=>{
            console.log(reason)
          })
    });
}