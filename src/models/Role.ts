
import { Document, Schema, model } from 'mongoose';

export interface IRole extends Document {
  authority:string
}

const RoleSchema = new Schema<IRole>({
    authority: {
    type: String,
    required: true,
    unique:true
  },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: "updatedAt"
  }
});

const role = model<IRole>("Role", RoleSchema);

export const RoleModel = role