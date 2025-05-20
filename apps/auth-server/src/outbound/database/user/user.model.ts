import { model, Schema } from 'mongoose';
import { UserOrmType } from './user.type';

const UserSchema = new Schema<UserOrmType>({
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  roles: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
});
export const UserModel = model<UserOrmType>('User', UserSchema);
