import { ApiProperty } from '@nestjs/swagger';

export class DeleteEventConditionRequestDto {
  @ApiProperty()
  conditionId: string;

  constructor(conditionId: string) {
    this.conditionId = conditionId;
  }
}
