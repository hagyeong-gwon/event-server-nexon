import { Injectable } from '@nestjs/common';
import { InjectUserRepository } from '../../../../base/repository.inject';
import { UserRepositoryPort } from '../../../port/repository/user.repository.port';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../../service/auth.service';

@Injectable()
export class SignInCommandHandler {
  constructor(
    @InjectUserRepository()
    private readonly userRepository: UserRepositoryPort,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}
  async execute(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOneByEmail(email);
    this.authService.validateExistence(user);
    await this.authService.validatePassword(password, user.passwordHash);

    return await this.authService.login(user);
  }
}
