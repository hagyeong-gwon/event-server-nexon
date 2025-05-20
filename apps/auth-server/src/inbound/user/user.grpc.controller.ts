import { BadRequestException, Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GetInviteCountQueryHandler } from '../../module/user/handler/query/get-invite-count.query.handler';
import { GetInviteCountRequestDto } from './dto/get-invite-count.request.dto';

@Controller()
export class UserGrpcController {
  constructor(
    private readonly getInviteCountQueryHandler: GetInviteCountQueryHandler,
  ) {}

  @GrpcMethod('AuthService', 'GetInviteCount')
  async getInviteCount(
    query: GetInviteCountRequestDto,
  ): Promise<Record<string, number>> {
    try {
      const inviteEntities = await this.getInviteCountQueryHandler.execute(
        query.userId,
      );
      return { count: inviteEntities.length };
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
