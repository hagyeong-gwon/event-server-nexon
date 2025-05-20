import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventModel } from './event.model';
import { EventRepository } from './event.repository';
import { EventConditionRepository } from './event-condition.repository';
import { EventConditionModel } from './event-condition.model';

const repositoryList = [
  {
    provide: 'EventRepository',
    useClass: EventRepository,
  },
  {
    provide: 'EventConditionRepository',
    useClass: EventConditionRepository,
  },
];

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: 'Event', schema: EventModel.schema },
        { name: 'EventCondition', schema: EventConditionModel.schema },
      ],
      'db',
    ),
  ],
  providers: [...repositoryList],
  exports: ['EventRepository', 'EventConditionRepository'],
})
export class EventDbModule {}
