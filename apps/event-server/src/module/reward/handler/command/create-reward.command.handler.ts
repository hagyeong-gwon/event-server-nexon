import { Injectable } from '@nestjs/common';
import { CreateRewardRequestDto } from '../../../../inbound/reward/dto/create-reward.request.dto';
import { RewardRepositoryPort } from '../../../port/repository/reward.repository.port';
import { InjectRewardRepository } from '../../../../base/repository.inject';
import { RewardEntity } from '../../domain/reward.entity';

@Injectable()
export class CreateRewardCommandHandler {
  constructor(
    @InjectRewardRepository()
    private readonly rewardRepository: RewardRepositoryPort,
  ) {}

  async execute(command: CreateRewardRequestDto): Promise<RewardEntity> {
    // TODO: Add validation logic if needed
    const reward = RewardEntity.create(command);
    return this.rewardRepository.saveOne(reward);
  }
}
