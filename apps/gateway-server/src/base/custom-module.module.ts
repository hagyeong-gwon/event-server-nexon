import { Module } from '@nestjs/common';
import { ConfigCustomModule } from './config/config.module';
import { GrpcModule } from './grpc/grpc.module';

const modules = [ConfigCustomModule, GrpcModule];
@Module({
  imports: [...modules],
  exports: [...modules],
})
export class CustomModule {}
