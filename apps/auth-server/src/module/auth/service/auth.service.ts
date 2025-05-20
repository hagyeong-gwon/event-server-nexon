import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '../../port/repository/user.repository.port';
import {
  ALREADY_EXISTS_USER,
  NOT_FOUND_PASSWORD,
  NOT_FOUND_USER,
} from '../constants/error-msg.constants';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../../user/domain/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectUserRepository } from '../../../base/repository.inject';

@Injectable()
export class AuthService {
  constructor(
    @InjectUserRepository()
    private readonly userRepository: UserRepositoryPort,
    private readonly jwtService: JwtService,
  ) {}

  validateExistence(user: UserEntity) {
    if (!user) {
      throw new BadRequestException(NOT_FOUND_USER);
    }
  }
  async validatePassword(password: string, passwordHash: string) {
    if (!(await bcrypt.compare(password, passwordHash))) {
      throw new BadRequestException(NOT_FOUND_PASSWORD);
    }
  }
  async validateDuplicateEmail(email: string) {
    const user = await this.userRepository.findOneByEmail(email);
    if (user) {
      throw new BadRequestException(ALREADY_EXISTS_USER);
    }
  }

  // TODO: token type 으로 구분, refresh token 발급
  async login(user?: UserEntity): Promise<{ accessToken: string }> {
    if (!user) {
      throw new BadRequestException(NOT_FOUND_USER);
    }

    const payload = {
      userId: user.id,
      email: user.email,
      roles: user.roles,
    };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
    };
  }
}
