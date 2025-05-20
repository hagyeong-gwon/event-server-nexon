import { model, Schema } from 'mongoose';
import { EventConditionOrmType } from './event-condition.type';

const EventCondition = new Schema<EventConditionOrmType>({
  conditionType: { type: String, required: true },
  eventId: { type: Schema.Types.ObjectId, required: true },
  value: { type: Number, required: true },
  unit: { type: String, required: true },
  conditionDetail: {
    type: Schema.Types.Mixed,
    required: true,
  },
  verifyType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
});
export const EventConditionModel = model<EventConditionOrmType>(
  'EventCondition',
  EventCondition,
);
