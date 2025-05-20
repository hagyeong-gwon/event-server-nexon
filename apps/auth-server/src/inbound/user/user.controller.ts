import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginUser } from '../../shared/decorator/login-user.decorator';
import { InviteUserCommandHandler } from '../../module/user/handler/command/invite-user.command.handler';
import { successResponse } from '../../shared/helper/response.helper';
import { InviteUserRequestDto } from './dto/invite-user.request.dto';

@ApiTags('user')
@ApiBearerAuth()
@Controller('api')
export class UserController {
  constructor(
    private readonly inviteUserCommandHandler: InviteUserCommandHandler,
  ) {}

  @ApiOperation({
    summary: '유저 초대 API',
    description: '입력한 이메일로 유저를 초대한 후 초대 이력을 생성한다.',
  })
  @Post('invite')
  async invite(
    @LoginUser('userId') userId: string,
    @LoginUser('email') userEmail: string,
    @Body() body: InviteUserRequestDto,
  ) {
    return successResponse(
      await this.inviteUserCommandHandler.execute(
        userId,
        userEmail,
        body.invitedUserEmail,
      ),
    );
  }
}
