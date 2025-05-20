import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { CustomModule } from './base/custom-module.module';
import { HttpModule } from '@nestjs/axios';
import { GlobalJwtModule } from './base/jwt/global-jwt.module';
import { DomainModule } from './module/domain.module';

@Module({
  imports: [CustomModule, HttpModule, GlobalJwtModule, DomainModule],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
