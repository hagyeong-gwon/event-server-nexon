import { ApiProperty } from '@nestjs/swagger';

export class ClaimRewardRequestDto {
  @ApiProperty()
  eventConditionId: string;

  constructor(eventConditionId: string) {
    this.eventConditionId = eventConditionId;
  }
}
