import { Module } from '@nestjs/common';
import { UserMapper } from './mapper/user.mapper';
import { InviteMapper } from './mapper/invite.mapper';
import { InviteUserCommandHandler } from './handler/command/invite-user.command.handler';
import { GetInviteCountQueryHandler } from './handler/query/get-invite-count.query.handler';

const handlers = [InviteUserCommandHandler];
const queries = [GetInviteCountQueryHandler];
const mappers = [UserMapper, InviteMapper];
@Module({
  imports: [],
  providers: [...handlers, ...queries, ...mappers],
  exports: [...handlers, ...queries, ...mappers],
})
export class UserModule {}
