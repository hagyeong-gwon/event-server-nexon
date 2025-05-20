import { Global, Module } from '@nestjs/common';
import { EventModule } from './event/event.module';
import { RewardModule } from './reward/reward.module';
import { ClaimModule } from './claim/claim.module';

const modules = [EventModule, RewardModule, ClaimModule];
@Global()
@Module({
  imports: [...modules],
  exports: [...modules],
})
export class DomainModule {}
