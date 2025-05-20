import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { Metadata } from '@grpc/grpc-js';
import { LoginUser } from '../../shared/type/login-user.type';

@ApiTags('Auth')
@Controller()
export class AuthGrpcController {
  constructor() {}

  @GrpcMethod('AuthService', 'Verify')
  async verify(data: any, metadata: Metadata): Promise<LoginUser> {
    // Implement your verification logic here
    return {
      userId: data['payload'].id,
      roles: data['payload'].roles,
      email: data['payload'].email,
    };
  }
}
