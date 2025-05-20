import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

const modules = [AuthModule, UserModule];
@Module({
  imports: [...modules],
  exports: [...modules],
})
export class DomainModule {}
