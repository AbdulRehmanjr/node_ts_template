// user.model.ts
import { Document, Schema, model } from 'mongoose';


export interface INote extends Document {
  title: string;
  description: string;
  tag: string;
  date: Date
}

const NoteSchema = new Schema<INote>({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "General"
  },
  date : {
    type:Date,
    default : Date.now
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: "updatedAt"
  }
});

export const NoteModel = model<INote>("Note", NoteSchema);