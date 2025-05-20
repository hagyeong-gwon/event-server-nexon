import { Injectable } from '@nestjs/common';
import {
  InjectInviteRepository,
  InjectUserRepository,
} from '../../../../base/repository.inject';
import { InviteRepositoryPort } from '../../../port/repository/invite.repository.port';
import { InviteEntity } from '../../domain/invite.entity';
import { UserRepositoryPort } from '../../../port/repository/user.repository.port';

@Injectable()
export class InviteUserCommandHandler {
  constructor(
    @InjectInviteRepository()
    private readonly inviteRepository: InviteRepositoryPort,
  ) {}

  async execute(userId: string, userEmail: string, invitedUserEmail: string) {
    const invite = InviteEntity.create({ userId, invitedUserEmail, userEmail });
    return await this.inviteRepository.saveOne(invite);
  }
}
