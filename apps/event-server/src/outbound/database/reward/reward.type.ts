import { BaseModelInterface } from '../base-model.interface';
import { RewardTypeEnum } from '../../../shared/enum/reward-type.enum';
import { MetadataType } from '../../../shared/type/metadata.type';
import { Types } from 'mongoose';

export interface RewardOrmType extends BaseModelInterface {
  eventConditionId: Types.ObjectId;
  description: string;
  isLive: boolean;
  rewardType: RewardTypeEnum;
  metadata: MetadataType;
  qty: number;
}
