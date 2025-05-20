import { ApiProperty } from '@nestjs/swagger';
import { RolesEnum } from '../../../shared/enum/roles.enum';

export class SignUpRequestDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty({
    enum: RolesEnum,
    enumName: 'RolesEnum',
    description: '유저 권한',
    example: [RolesEnum.USER],
  })
  roles: RolesEnum[];
  @ApiProperty({
    required: false,
  })
  invitedByUserEmail: string;

  constructor(
    email: string,
    password: string,
    roles: RolesEnum[],
    invitedByUserEmail?: string,
  ) {
    this.email = email;
    this.password = password;
    this.roles = roles;
    this.invitedByUserEmail = invitedByUserEmail;
  }
}
