import { EventConditionEnum } from '../../../shared/enum/event-condition.enum';
import { VerifyTypeEnum } from '../../../shared/enum/verify-type.enum';
import { ConditionDetailType } from '../../../shared/type/condition-detail.type';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventConditionRequestDto {
  @ApiProperty()
  eventId: string;
  @ApiProperty({
    enum: EventConditionEnum,
    enumName: 'EventConditionEnum',
    description: '이벤트 조건 타입',
    example: EventConditionEnum.INVITE,
  })
  conditionType: EventConditionEnum;
  @ApiProperty()
  value: number;
  @ApiProperty()
  unit: string;
  @ApiProperty({
    enum: VerifyTypeEnum,
    enumName: 'VerifyTypeEnum',
    description: '검증 타입',
    example: VerifyTypeEnum.AUTO,
  })
  verifyType: VerifyTypeEnum;
  @ApiProperty({
    description: '조건 상세',
    example: {
      continuous: 'boolean', // 예: 연속 로그인 여부
      minAmount: 'number', // 예: 최소 구매 금액
    },
  })
  conditionDetail: ConditionDetailType;

  constructor(
    eventId: string,
    conditionType: EventConditionEnum,
    value: number,
    unit: string,
    verifyType: VerifyTypeEnum,
    conditionDetail: ConditionDetailType,
  ) {
    this.eventId = eventId;
    this.conditionType = conditionType;
    this.value = value;
    this.unit = unit;
    this.verifyType = verifyType;
    this.conditionDetail = conditionDetail;
  }
}
