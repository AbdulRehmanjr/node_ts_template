
import { Document, Schema, model } from 'mongoose';



const RoleSchema = new Schema({
  authority: {
    type: String,
    required: true,
    unique: true
  },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: "updatedAt"
  }
});

const role = model("Role", RoleSchema);

export const RoleModel = role