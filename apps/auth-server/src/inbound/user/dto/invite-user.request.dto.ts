import { ApiProperty } from '@nestjs/swagger';

export class InviteUserRequestDto {
  @ApiProperty()
  invitedUserEmail: string;

  constructor(invitedUserEmail: string) {
    this.invitedUserEmail = invitedUserEmail;
  }
}
