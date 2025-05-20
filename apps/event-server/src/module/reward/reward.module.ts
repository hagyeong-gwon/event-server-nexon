import { Module } from '@nestjs/common';
import { CreateRewardCommandHandler } from './handler/command/create-reward.command.handler';
import { SearchRewardQueryHandler } from './handler/query/search-reward.query.handler';

const handlers = [CreateRewardCommandHandler];
const query = [SearchRewardQueryHandler];
@Module({
  imports: [],
  providers: [...handlers, ...query],
  exports: [...handlers, ...query],
})
export class RewardModule {}
