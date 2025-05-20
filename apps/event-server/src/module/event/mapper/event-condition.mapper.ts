import { EventConditionOrmType } from '../../../outbound/database/event/event-condition.type';
import { EventConditionEntity } from '../domain/event-condition.entity';
import { ObjectId } from '../../../shared/helper/object-id.helper';

export class EventConditionMapper {
  static toDomain(doc: EventConditionOrmType): EventConditionEntity {
    if (!doc) {
      return null;
    }
    return new EventConditionEntity({
      id: doc._id.toString(),
      eventId: doc.eventId.toString(),
      verifyType: doc.verifyType,
      conditionType: doc.conditionType,
      value: doc.value,
      unit: doc.unit,
      conditionDetail: doc.conditionDetail,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  static toPersistence(
    domain: EventConditionEntity,
  ): Partial<EventConditionOrmType> {
    return {
      eventId: ObjectId(domain.eventId),
      verifyType: domain.verifyType,
      conditionType: domain.conditionType,
      value: domain.value,
      unit: domain.unit,
      conditionDetail: domain.conditionDetail,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
