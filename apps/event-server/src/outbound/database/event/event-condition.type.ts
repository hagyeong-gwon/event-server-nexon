import { BaseModelInterface } from '../base-model.interface';
import { ConditionDetailType } from '../../../shared/type/condition-detail.type';
import { EventConditionEnum } from '../../../shared/enum/event-condition.enum';
import { VerifyTypeEnum } from '../../../shared/enum/verify-type.enum';
import { Types } from 'mongoose';

export interface EventConditionOrmType extends BaseModelInterface {
  eventId: Types.ObjectId;
  conditionType: EventConditionEnum;
  verifyType: VerifyTypeEnum;
  value: number;
  unit: string;
  conditionDetail: ConditionDetailType;
}
