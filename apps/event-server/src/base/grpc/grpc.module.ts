import { Global, Module } from '@nestjs/common';
import { AuthGrpcModule } from './auth.grpc.module';

@Global()
@Module({
  imports: [AuthGrpcModule],
  exports: [AuthGrpcModule],
})
export class GrpcModule {}
