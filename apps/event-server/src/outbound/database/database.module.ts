import { Global, Module } from '@nestjs/common';
import { EventDbModule } from './event/event-db.module';
import { RewardDbModule } from './reward/reward-db.module';
import { ClaimDbModule } from './claim/claim-db.module';

const modules = [EventDbModule, RewardDbModule, ClaimDbModule];

@Global()
@Module({
  imports: [...modules],
  exports: [...modules],
})
export class DatabaseModule {}
