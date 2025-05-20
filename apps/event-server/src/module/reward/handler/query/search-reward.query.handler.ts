import { Injectable } from '@nestjs/common';
import { InjectRewardRepository } from '../../../../base/repository.inject';
import { RewardRepositoryPort } from '../../../port/repository/reward.repository.port';
import { RewardEntity } from '../../domain/reward.entity';

@Injectable()
export class SearchRewardQueryHandler {
  constructor(
    @InjectRewardRepository()
    private readonly rewardRepository: RewardRepositoryPort,
  ) {}

  async execute(eventConditionId: string): Promise<RewardEntity[]> {
    return await this.rewardRepository.findActiveAllByConditionId(
      eventConditionId,
    );
  }
}
