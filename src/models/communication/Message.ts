
import { Schema, model } from 'mongoose';


const MesssageSchema = new Schema({

    senderId:{
        type:String,
        required:true
    },
    receiverId:{
        type:String,
        required:true
    },
    content: {
       type:String,
       required:true
    },
    time:{
      type:String,
      required:true  
    },
    isRead:{
        type:Boolean,
        default: false
    }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: "updatedAt"
    }
});

const message = model("Message", MesssageSchema);

export const MessageModel = message