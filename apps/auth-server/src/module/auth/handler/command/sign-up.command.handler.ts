import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '../../../port/repository/user.repository.port';
import { AuthService } from '../../service/auth.service';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../../../user/domain/user.entity';
import { RolesEnum } from '../../../../shared/enum/roles.enum';
import {
  InjectInviteRepository,
  InjectUserRepository,
} from '../../../../base/repository.inject';
import { ConfigService } from '@nestjs/config';
import { InviteRepositoryPort } from '../../../port/repository/invite.repository.port';

@Injectable()
export class SignUpCommandHandler {
  constructor(
    @InjectUserRepository()
    private readonly userRepository: UserRepositoryPort,
    @InjectInviteRepository()
    private readonly inviteRepository: InviteRepositoryPort,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  async execute(
    email: string,
    password: string,
    roles: RolesEnum[],
    invitedByUserEmail?: string,
  ) {
    const hashNum = this.configService.get('HASH_NUM');
    await this.authService.validateDuplicateEmail(email);

    const passwordHash = await bcrypt.hash(password, hashNum);

    const user = UserEntity.create({
      email,
      passwordHash: passwordHash,
      roles,
    });

    const savedUser = await this.userRepository.saveOne(user);

    if (invitedByUserEmail) {
      await this.inviteRepository.findAndUpdateIsSignUp(
        invitedByUserEmail,
        email,
      );
    }
    return await this.authService.login(savedUser);
  }
}
