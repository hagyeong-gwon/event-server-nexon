import { EventEntity } from '../domain/event.entity';
import { EventOrmType } from '../../../outbound/database/event/event.type';
export class EventMapper {
  static toDomain(doc: EventOrmType): EventEntity {
    if (!doc) {
      return null;
    }
    return new EventEntity({
      id: doc._id.toString(),
      title: doc.title,
      description: doc.description,
      isLive: doc.isLive,
      startDate: doc.startDate,
      endDate: doc.endDate,
      createdBy: doc.createdBy,
      updatedBy: doc.updatedBy,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      deletedAt: doc.deletedAt,
    });
  }

  static toPersistence(domain: EventEntity): Partial<EventOrmType> {
    return {
      description: domain.description,
      title: domain.title,
      isLive: domain.isLive,
      startDate: domain.startDate,
      endDate: domain.endDate,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: domain.createdBy,
    };
  }
}
