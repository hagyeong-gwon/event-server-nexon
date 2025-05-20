import { Module } from '@nestjs/common';
import { AuthGrpcModule } from './auth/auth.grpc.module';

@Module({
  imports: [AuthGrpcModule],
  exports: [AuthGrpcModule],
})
export class GrpcModule {}
