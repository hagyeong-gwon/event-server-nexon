import { BaseModelInterface } from '../base-model.interface';
import { Types } from 'mongoose';

export interface InviteOrmType extends BaseModelInterface {
  userId: Types.ObjectId;
  invitedUserEmail: string;
  userEmail: string;
  isSignUp: boolean;
}
