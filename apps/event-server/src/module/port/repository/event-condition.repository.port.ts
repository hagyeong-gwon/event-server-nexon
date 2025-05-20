import { MongoBaseRepository } from '../../../outbound/database/base-mongo.repository';
import { EventConditionEntity } from '../../event/domain/event-condition.entity';
import { EventConditionOrmType } from '../../../outbound/database/event/event-condition.type';

export abstract class EventConditionRepositoryPort extends MongoBaseRepository<
  EventConditionEntity,
  EventConditionOrmType
> {
  abstract findAllByEventId(eventId: string): Promise<EventConditionEntity[]>;
  abstract deleteByConditionId(
    conditionId: string,
  ): Promise<EventConditionEntity | null>;
  abstract findActiveOneById(id: string): Promise<EventConditionEntity>;
}
