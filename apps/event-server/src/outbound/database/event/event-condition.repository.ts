import { MongoBaseRepository } from '../base-mongo.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Promise, Types } from 'mongoose';
import { EventConditionEntity } from '../../../module/event/domain/event-condition.entity';
import { EventConditionOrmType } from './event-condition.type';
import { EventConditionMapper } from '../../../module/event/mapper/event-condition.mapper';
import { EventConditionRepositoryPort } from '../../../module/port/repository/event-condition.repository.port';
import { ObjectId } from '../../../shared/helper/object-id.helper';

@Injectable()
export class EventConditionRepository
  extends MongoBaseRepository<EventConditionEntity, EventConditionOrmType>
  implements EventConditionRepositoryPort
{
  constructor(
    @InjectModel('EventCondition', 'db')
    private readonly eventConditionModel: Model<EventConditionOrmType>,
  ) {
    super(eventConditionModel, EventConditionMapper);
  }
  async findAllByEventId(eventId: string): Promise<EventConditionEntity[]> {
    const docs = await this.eventConditionModel.find({
      eventId: ObjectId(eventId),
      deletedAt: null,
    });
    return docs.map((doc) => EventConditionMapper.toDomain(doc));
  }

  async deleteByConditionId(
    conditionId: string,
  ): Promise<EventConditionEntity | null> {
    const doc = await this.eventConditionModel.findByIdAndUpdate(
      ObjectId(conditionId),
      {
        deletedAt: new Date(),
      },
    );
    return doc ? EventConditionMapper.toDomain(doc) : null;
  }
  async findActiveOneById(id: string): Promise<EventConditionEntity> {
    const doc = await this.eventConditionModel.findOne({
      _id: ObjectId(id),
      deletedAt: null,
    });
    return doc ? EventConditionMapper.toDomain(doc) : null;
  }
}
