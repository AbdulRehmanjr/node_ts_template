
import mongoose, { Schema, model } from 'mongoose';


const ProductSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    code: {
        type: String,
        require: true,
        unique: true
    },
    imageSrc: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    quantity:{
        type:Number,
        require: true
    },
    rating:{
        type:Number,
        require:true
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
    }

}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: "updatedAt"
    }
});

const product = model("Product", ProductSchema);

export const ProductModel = product