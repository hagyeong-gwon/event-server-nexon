import { ApiProperty } from '@nestjs/swagger';

export class CreateEventRequestDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  isLive: boolean;
  @ApiProperty({
    example: '2025-05-20 10:10:10',
  })
  startDate: string;
  @ApiProperty({
    example: '2026-05-20 10:10:10',
  })
  endDate: string;
  constructor(
    title: string,
    description: string,
    isLive: boolean,
    startDate: string,
    endDate: string,
  ) {
    this.title = title;
    this.description = description;
    this.isLive = isLive;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
