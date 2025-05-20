import { ClaimEntity } from '../domain/claim.entity';
import { ClaimOrmType } from '../../../outbound/database/claim/claim.type';
import { ObjectId } from '../../../shared/helper/object-id.helper';

export class ClaimMapper {
  static toDomain(doc: ClaimOrmType): ClaimEntity {
    if (!doc) {
      return null;
    }

    return new ClaimEntity({
      id: doc._id.toString(),
      eventConditionId: doc.eventConditionId.toString(),
      eventId: doc.eventId.toString(),
      userId: doc.userId.toString(),
      rewardIds: doc.rewardIds?.map((rewardId) => rewardId.toString()),
      status: doc.status,
      reason: doc.reason,
      requestedAt: doc.requestedAt,
    });
  }

  static toPersistence(domain: ClaimEntity): Partial<ClaimOrmType> {
    return {
      id: domain.id,
      eventConditionId: ObjectId(domain.eventConditionId),
      eventId: ObjectId(domain.eventId),
      rewardIds: domain.rewardIds?.map((rewardId) => ObjectId(rewardId)),
      userId: ObjectId(domain.userId),
      status: domain.status,
      reason: domain.reason,
      requestedAt: domain.requestedAt,
    };
  }
}
