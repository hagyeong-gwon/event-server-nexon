import { model, Schema } from 'mongoose';
import { ClaimOrmType } from './claim.type';

const ClaimSchema = new Schema<ClaimOrmType>({
  eventId: { type: Schema.Types.ObjectId, required: true },
  eventConditionId: { type: Schema.Types.ObjectId, required: true },
  rewardIds: { type: [Schema.Types.ObjectId], required: true },
  userId: { type: Schema.Types.ObjectId, required: true },
  status: { type: String, required: true },
  reason: { type: String, required: false },
  requestedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
});
export const ClaimModel = model<ClaimOrmType>('Claim', ClaimSchema);
