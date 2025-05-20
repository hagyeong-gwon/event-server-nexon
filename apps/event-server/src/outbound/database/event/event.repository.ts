import { EventRepositoryPort } from '../../../module/port/repository/event.repository.port';
import { MongoBaseRepository } from '../base-mongo.repository';
import { EventEntity } from '../../../module/event/domain/event.entity';
import { EventMapper } from '../../../module/event/mapper/event.mapper';
import { EventOrmType } from './event.type';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Promise } from 'mongoose';

@Injectable()
export class EventRepository
  extends MongoBaseRepository<EventEntity, EventOrmType>
  implements EventRepositoryPort
{
  constructor(
    @InjectModel('Event', 'db')
    private readonly eventModel: Model<EventOrmType>,
  ) {
    super(eventModel, EventMapper);
  }

  async findPaginatedEvents(
    skip: number,
    size: number,
    orderBy?: string,
  ): Promise<EventEntity[]> {
    const docs = await this.eventModel
      .find()
      .sort({ [orderBy || '_id']: -1 })
      .skip(skip)
      .limit(skip + size)
      .exec();

    return docs.map((doc) => EventMapper.toDomain(doc));
  }
}
