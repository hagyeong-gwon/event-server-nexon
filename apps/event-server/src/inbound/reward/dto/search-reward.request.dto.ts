import { ApiProperty } from '@nestjs/swagger';

export class SearchRewardRequestDto {
  @ApiProperty()
  eventConditionId: string;

  constructor(eventId: string) {
    this.eventConditionId = eventId;
  }
}
