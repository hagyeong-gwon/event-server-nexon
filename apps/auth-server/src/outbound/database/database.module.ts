import { Global, Module } from '@nestjs/common';
import { UserDbModule } from './user/user-db.module';
import { InviteDbModule } from './invite/invite-db.module';

const modules = [UserDbModule, InviteDbModule];

@Global()
@Module({
  imports: [...modules],
  exports: [...modules],
})
export class DatabaseModule {}
