import { Module } from '@nestjs/common';
import { ConfigCustomModule } from './base/config/config.module';
import { MongoModule } from './base/mongo/mongo.module';
import { InboundModule } from './inbound/inbound.module';
import { OutboundModule } from './outbound/outbound.module';
import { DomainModule } from './module/domain.module';

import { GlobalJwtModule } from './base/jwt/global-jwt.module';

@Module({
  imports: [
    ConfigCustomModule,
    GlobalJwtModule,
    MongoModule,
    InboundModule,
    OutboundModule,
    DomainModule,
  ],
})
export class AuthServerModule {}
