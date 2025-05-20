import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

const modules = [AuthModule];
@Module({
  imports: [...modules],
  exports: [...modules],
})
export class DomainModule {}
