import { Injectable } from '@nestjs/common';
import { InjectInviteRepository } from '../../../base/repository.inject';
import { InviteRepositoryPort } from '../../port/repository/invite.repository.port';

@Injectable()
export class UserService {
  constructor(
    @InjectInviteRepository()
    private readonly inviteRepository: InviteRepositoryPort,
  ) {}
}
