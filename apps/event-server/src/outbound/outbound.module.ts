import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthGrpcService } from './grpc/auth.grpc.service';
import { AuthGrpcModule } from '../base/grpc/auth.grpc.module';

const services = [AuthGrpcService];
@Global()
@Module({
  imports: [DatabaseModule, AuthGrpcModule],
  providers: [...services],
  exports: [DatabaseModule, ...services],
})
export class OutboundModule {}
