import { Types } from 'mongoose';

export function ObjectId(value: string): Types.ObjectId {
  return new Types.ObjectId(value);
}
