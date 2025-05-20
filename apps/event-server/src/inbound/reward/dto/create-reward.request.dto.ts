import { ApiProperty } from '@nestjs/swagger';
import { RewardTypeEnum } from '../../../shared/enum/reward-type.enum';
import { MetadataType } from '../../../shared/type/metadata.type';
import { IsEnum, IsMongoId } from 'class-validator';

export class CreateRewardRequestDto {
  @ApiProperty()
  @IsMongoId()
  eventConditionId: string;
  @ApiProperty()
  description: string;
  @ApiProperty({
    enum: RewardTypeEnum,
    enumName: 'RewardTypeEnum',
    description: '보상 타입',
    example: RewardTypeEnum.POINT,
  })
  @IsEnum(RewardTypeEnum)
  rewardType: RewardTypeEnum;
  @ApiProperty({
    description: '추가 메타데이터 (쿠폰코드, 아이템ID 등)',
    example: {
      itemId: 'itemId',
      couponCode: 'couponCode',
      point: 100,
    },
  })
  metadata: MetadataType;
  @ApiProperty()
  qty: number;

  constructor(
    eventConditionId: string,
    description: string,
    rewardType: RewardTypeEnum,
    metadata: MetadataType,
    qty: number,
  ) {
    this.eventConditionId = eventConditionId;
    this.description = description;
    this.rewardType = rewardType;
    this.metadata = metadata;
    this.qty = qty;
  }
}
