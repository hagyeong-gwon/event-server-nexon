import { ApiProperty } from '@nestjs/swagger';
import { ClaimStateEnum } from '../../../shared/enum/claim-state.enum';

export class UpdateClaimStatusRequestDto {
  @ApiProperty()
  id: string;
  @ApiProperty({
    enum: ClaimStateEnum,
    description: '보상 요청 상태',
    required: true,
    example: ClaimStateEnum.PENDING,
  })
  status: ClaimStateEnum;

  constructor({ id, status }) {
    this.status = status;
    this.id = id;
  }
}
