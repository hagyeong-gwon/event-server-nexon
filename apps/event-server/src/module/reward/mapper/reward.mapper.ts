import { RewardEntity } from '../domain/reward.entity';
import { RewardOrmType } from '../../../outbound/database/reward/reward.type';
import { ObjectId } from '../../../shared/helper/object-id.helper';

export class RewardMapper {
  static toDomain(doc: RewardOrmType): RewardEntity {
    if (!doc) {
      return null;
    }
    return new RewardEntity({
      id: doc._id.toString(),
      eventConditionId: doc.eventConditionId.toString(),
      description: doc.description,
      isLive: doc.isLive,
      rewardType: doc.rewardType,
      metadata: doc.metadata,
      qty: doc.qty,
      createdBy: doc.createdBy,
      updatedBy: doc.updatedBy,
      createdAt: doc.createdAt,
    });
  }
  static toPersistence(domain: RewardEntity): Partial<RewardOrmType> {
    return {
      eventConditionId: ObjectId(domain.eventConditionId),
      description: domain.description,
      isLive: domain.isLive,
      rewardType: domain.rewardType,
      metadata: domain.metadata,
      qty: domain.qty,
      createdBy: domain.createdBy,
      updatedBy: domain.updatedBy,
      createdAt: domain.createdAt,
    };
  }
}
