import { Module } from '@nestjs/common';
import { DomainModule } from '../module/domain.module';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';
import { UserGrpcController } from './user/user.grpc.controller';

const controllers = [AuthController, UserController, UserGrpcController];

@Module({
  imports: [DomainModule],
  controllers: [...controllers],
  providers: [],
})
export class InboundModule {}
