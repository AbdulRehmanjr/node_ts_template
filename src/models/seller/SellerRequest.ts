
import { Schema, model } from 'mongoose';
import { SellerRequest } from '../../classes/seller/SellerRequest';


const RequestSchema = new Schema<SellerRequest>({
    userId:{
        type:String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    businessType: {
        type: String,
        required: true
    },
    businessAddress: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    document: {
        type: String,
        required: true
    },
    isAccept: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: "updatedAt"
    }
});

const request = model<SellerRequest>("SellerRequest", RequestSchema);

export const SellerRequestModel = request