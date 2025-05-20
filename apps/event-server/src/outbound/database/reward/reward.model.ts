import { model, Schema } from 'mongoose';
import { RewardOrmType } from './reward.type';

const RewardSchema = new Schema<RewardOrmType>({
  eventConditionId: { type: Schema.Types.ObjectId, required: true },
  description: { type: String, required: true },
  isLive: { type: Boolean, required: true, default: true },
  rewardType: { type: String, required: true },
  metadata: { type: Object, required: true },
  qty: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: String },
  updatedBy: { type: String },
  deletedAt: { type: Date, default: null },
});
export const RewardModel = model<RewardOrmType>('Reward', RewardSchema);
