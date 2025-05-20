import { BaseModelInterface } from '../base-model.interface';
import { Types } from 'mongoose';

export interface ClaimOrmType extends BaseModelInterface {
  eventId: Types.ObjectId;
  eventConditionId: Types.ObjectId;
  rewardIds?: Types.ObjectId[];
  userId: Types.ObjectId;
  status: string;
  reason: string;
  requestedAt: Date;
}
