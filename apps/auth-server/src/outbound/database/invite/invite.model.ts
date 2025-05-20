import { model, Schema } from 'mongoose';
import { InviteOrmType } from './invite.type';

const InviteSchema = new Schema<InviteOrmType>({
  userId: { type: Schema.Types.ObjectId, required: true },
  invitedUserEmail: { type: String, required: true },
  userEmail: { type: String, required: true },
  isSignUp: { type: Boolean, require: true },
  createdAt: { type: Date, default: Date.now },
});
export const InviteModel = model<InviteOrmType>('Invite', InviteSchema);
