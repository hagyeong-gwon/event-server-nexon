import { Module } from '@nestjs/common';
import { EventAdminController } from './event/event.admin.controller';
import { RewardAdminController } from './reward/reward.admin.controller';
import { DomainModule } from '../module/domain.module';
import { ClaimController } from './claim/claim.controller';
import { ClaimAdminController } from './claim/claim.admin.controller';
import { RewardMessageListener } from './reward/reward-message.listener';

@Module({
  imports: [DomainModule],
  controllers: [
    EventAdminController,
    RewardAdminController,
    ClaimController,
    ClaimAdminController,
  ],
  providers: [RewardMessageListener],
})
export class InboundModule {}
