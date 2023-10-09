
import mongoose, { Schema, model } from 'mongoose';


const MesssageSchema = new Schema({

    sender:{
        type:String,
        require
    },
    receiver:{
        type:String,
        require
    },
    content: {
       type:String,
       require
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

export const MessageModels = message