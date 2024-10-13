import { model, Schema } from 'mongoose';

const SessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId, ref: 'Users',
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenValidUntil: {
      type: Date,
      required: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const SessionCollection = model('Session', SessionSchema);
