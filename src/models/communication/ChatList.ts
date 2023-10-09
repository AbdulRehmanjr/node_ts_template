
import mongoose, { Schema, model } from 'mongoose';


const ChatListSchema = new Schema({

    user:{
        type:String,
        required:true
    },
    list:[{
        type: Schema.Types.ObjectId, 
        ref: 'User'                  
    }],
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: "updatedAt"
    }
});

const ChatList = model("ChatList", ChatListSchema);

export const ChatListModel = ChatList