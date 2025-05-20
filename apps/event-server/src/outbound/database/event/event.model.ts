import { model, Schema } from 'mongoose';
import { EventOrmType } from './event.type';

const EventSchema = new Schema<EventOrmType>({
  title: { type: String, required: true },
  description: { type: String },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  isLive: { type: Boolean, required: true, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: { type: String },
  updatedBy: { type: String },
  deletedAt: { type: Date, default: null },
});
export const EventModel = model<EventOrmType>('Event', EventSchema);
