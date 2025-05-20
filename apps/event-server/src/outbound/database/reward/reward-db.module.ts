import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RewardModel } from './reward.model';
import { RewardRepository } from './reward.repository';

const repositoryList = [
  {
    provide: 'RewardRepository',
    useClass: RewardRepository,
  },
];

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: 'Reward', schema: RewardModel.schema }],
      'db',
    ),
  ],
  providers: [...repositoryList],
  exports: ['RewardRepository'],
})
export class RewardDbModule {}
