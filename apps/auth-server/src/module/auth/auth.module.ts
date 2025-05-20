import { Module } from '@nestjs/common';
import { SignUpCommandHandler } from './handler/command/sign-up.command.handler';
import { DatabaseModule } from '../../outbound/database/database.module';
import { SignInCommandHandler } from './handler/command/sign-in.command.handler';
import { AuthService } from './service/auth.service';
import { GlobalJwtModule } from '../../base/jwt/global-jwt.module';
const handlers = [SignUpCommandHandler, SignInCommandHandler];
const queries = [];
const mappers = [];
const services = [AuthService];

@Module({
  imports: [],
  providers: [...handlers, ...queries, ...mappers, ...services],
  exports: [...handlers, ...queries, ...mappers, ...services],
})
export class AuthModule {}
