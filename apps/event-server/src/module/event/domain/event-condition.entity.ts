import { EventConditionEnum } from '../../../shared/enum/event-condition.enum';
import { VerifyTypeEnum } from '../../../shared/enum/verify-type.enum';
import { ConditionDetailType } from '../../../shared/type/condition-detail.type';

export type EventConditionProps = {
  id?: string;
  conditionType: EventConditionEnum;
  verifyType: VerifyTypeEnum;
  eventId: string;
  value: number;
  unit: string;
  conditionDetail: ConditionDetailType;
  createdAt?: Date;
  updatedAt?: Date;
};

export class EventConditionEntity {
  public readonly id: string;
  public readonly conditionType: EventConditionEnum;
  public readonly eventId: string;
  public readonly value: number;
  public readonly unit: string;
  public readonly verifyType: VerifyTypeEnum;
  public readonly conditionDetail: ConditionDetailType;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(props: EventConditionProps) {
    this.id = props.id;
    this.conditionType = props.conditionType;
    this.verifyType = props.verifyType;
    this.eventId = props.eventId;
    this.value = props.value;
    this.unit = props.unit;
    this.conditionDetail = props.conditionDetail;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }

  static create({
    conditionType,
    verifyType,
    eventId,
    value,
    unit,
    conditionDetail,
  }): EventConditionEntity {
    return new EventConditionEntity({
      conditionType,
      verifyType,
      eventId,
      value,
      unit,
      conditionDetail,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
