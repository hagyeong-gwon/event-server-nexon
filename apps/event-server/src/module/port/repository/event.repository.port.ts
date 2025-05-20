import { MongoBaseRepository } from '../../../outbound/database/base-mongo.repository';
import { EventEntity } from '../../event/domain/event.entity';
import { EventOrmType } from '../../../outbound/database/event/event.type';

export abstract class EventRepositoryPort extends MongoBaseRepository<
  EventEntity,
  EventOrmType
> {
  abstract findPaginatedEvents(
    skip: number,
    size: number,
    orderBy?: string,
  ): Promise<EventEntity[]>;
}
