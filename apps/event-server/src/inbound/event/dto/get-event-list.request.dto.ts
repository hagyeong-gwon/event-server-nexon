import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GetEventListRequestDto {
  @ApiProperty()
  page: number;
  @ApiProperty()
  size: number;
  @ApiProperty({ required: false })
  @IsOptional()
  orderBy?: string;
  constructor(page: number, size: number, orderBy?: string) {
    this.page = page;
    this.size = size;
    this.orderBy = orderBy;
  }
}
