import { Document } from 'mongoose';

export interface BaseModelInterface extends Document {
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  deletedAt?: Date;
}
