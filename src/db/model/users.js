import { model, Schema } from 'mongoose';
import { VALID_EXP } from '../../constants/validRegExp.js';

export const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: VALID_EXP.EMAIL,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const UserCollection = model('User', UserSchema);
