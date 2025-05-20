import { ApiProperty } from '@nestjs/swagger';
import { ClaimStateEnum } from '../../../shared/enum/claim-state.enum';
import { IsOptional } from 'class-validator';

export class GetClaimListRequestDto {
  @ApiProperty({
    enum: ClaimStateEnum,
    description: '보상 요청 상태',
    required: false,
    example: ClaimStateEnum.PENDING,
  })
  @IsOptional()
  status: ClaimStateEnum;
  @ApiProperty()
  page: number;
  @ApiProperty()
  size: number;
  @ApiProperty({ required: false })
  @IsOptional()
  orderBy?: string;

  constructor({ page, size, status, orderBy }) {
    this.status = status;
    this.page = page || 0;
    this.size = size || 0;
    this.orderBy = orderBy;
  }
}
