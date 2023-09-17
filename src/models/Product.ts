
import { Schema, model } from 'mongoose';
import { Product } from '../classes/Product';

const ProductSchema = new Schema<Product>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    imageSrc:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: "updatedAt"
    }
});

const product = model<Product>("Product", ProductSchema);

export const ProductModel = product