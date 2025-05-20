import { Injectable } from '@nestjs/common';
import { InjectInviteRepository } from '../../../../base/repository.inject';
import { InviteRepositoryPort } from '../../../port/repository/invite.repository.port';

@Injectable()
export class GetInviteCountQueryHandler {
  constructor(
    @InjectInviteRepository()
    private readonly inviteRepository: InviteRepositoryPort,
  ) {}

  async execute(userId: string) {
    return await this.inviteRepository.findSignUpAllByUserId(userId);
  }
}
