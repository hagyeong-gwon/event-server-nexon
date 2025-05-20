import { MongoBaseRepository } from '../../../outbound/database/base-mongo.repository';
import { RewardOrmType } from '../../../outbound/database/reward/reward.type';
import { RewardEntity } from '../../reward/domain/reward.entity';

export abstract class RewardRepositoryPort extends MongoBaseRepository<
  RewardEntity,
  RewardOrmType
> {
  abstract findActiveAllByConditionId(
    eventConditionId: string,
  ): Promise<RewardEntity[]>;
}
