import { Injectable } from '@nestjs/common';
import { MongoBaseRepository } from '../base-mongo.repository';
import { RewardEntity } from '../../../module/reward/domain/reward.entity';
import { RewardOrmType } from './reward.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Promise } from 'mongoose';
import { RewardMapper } from '../../../module/reward/mapper/reward.mapper';
import { RewardRepositoryPort } from '../../../module/port/repository/reward.repository.port';
import { ObjectId } from '../../../shared/helper/object-id.helper';

@Injectable()
export class RewardRepository
  extends MongoBaseRepository<RewardEntity, RewardOrmType>
  implements RewardRepositoryPort
{
  constructor(
    @InjectModel('Reward', 'db')
    private readonly rewardModel: Model<RewardOrmType>,
  ) {
    super(rewardModel, RewardMapper);
  }

  async findActiveAllByConditionId(
    eventConditionId: string,
  ): Promise<RewardEntity[]> {
    const docs = await this.rewardModel
      .find({
        eventConditionId: ObjectId(eventConditionId),
        deletedAt: null,
      })
      .sort({ _id: -1 })
      .exec();
    return docs.map((doc) => RewardMapper.toDomain(doc));
  }
}
