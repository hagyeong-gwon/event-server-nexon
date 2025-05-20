import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignUpRequestDto } from './dto/sign-up.request.dto';
import { SignUpCommandHandler } from '../../module/auth/handler/command/sign-up.command.handler';
import { SignInRequestDto } from './dto/sign-in.request.dto';
import { SignInCommandHandler } from '../../module/auth/handler/command/sign-in.command.handler';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller()
export class AuthController {
  constructor(
    private readonly signUpCommandHandler: SignUpCommandHandler,
    private readonly signInCommandHandler: SignInCommandHandler,
  ) {}

  @ApiOperation({
    summary: '회원가입 API',
    description: '회원가입 API',
  })
  @Post('signUp')
  async signUp(@Body() body: SignUpRequestDto) {
    const { email, password, roles, invitedByUserEmail } = body;
    return this.signUpCommandHandler.execute(
      email,
      password,
      roles,
      invitedByUserEmail,
    );
  }

  @ApiOperation({
    summary: '로그인 API',
    description: '로그인 API',
  })
  @Post('signIn')
  async signIn(@Body() body: SignInRequestDto) {
    const { email, password } = body;
    return this.signInCommandHandler.execute(email, password);
  }
}
