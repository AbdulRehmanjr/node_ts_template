
import { Document, Schema, model } from 'mongoose';
import { Category } from '../classes/Category';

const CategorySchema = new Schema<Category>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image:{
        type:String,
        required:true
    }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: "updatedAt"
    }
});

const category = model<Category>("Category", CategorySchema);

export const CategoryModel = category