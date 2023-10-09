// user.model.ts
import mongoose, { Document, Schema, model } from 'mongoose';
import * as bcrypt from 'bcryptjs'



const UserSchema = new Schema({
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
  profile:{
    type:String,
    required:true,
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  role: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Role',
    },
  ],
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: "updatedAt"
  }
});

UserSchema.pre('save', function (next) {
  var user = this;

  if (!user.isModified('password')) return next();


  bcrypt.genSalt(10, function (err: NativeError, salt: any) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err: NativeError, hash: string) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
const user = model("User", UserSchema);

export const UserModel = user