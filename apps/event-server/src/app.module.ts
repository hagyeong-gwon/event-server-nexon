import { Module } from '@nestjs/common';
import { ConfigCustomModule } from './base/config/config.module';
import { MongoModule } from './base/mongo/mongo.module';
import { InboundModule } from './inbound/inbound.module';
import { DomainModule } from './module/domain.module';
import { OutboundModule } from './outbound/outbound.module';
@Module({
  imports: [
    ConfigCustomModule,
    MongoModule,
    InboundModule,
    OutboundModule,
    DomainModule,
  ],
})
export class AppModule {}
