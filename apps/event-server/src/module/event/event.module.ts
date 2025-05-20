import { Module } from '@nestjs/common';
import { UpdateEventCommandHandler } from './handler/command/update-event.command.handler';
import { DeleteEventCommandHandler } from './handler/command/delete-event.command.handler';
import { CreateEventCommandHandler } from './handler/command/create-event.command.handler';
import { CreateEventConditionCommandHandler } from './handler/command/create-event-condition.command.handler';
import { GetPaginatedEventQueryHandler } from './handler/query/get-paginated-event.query.handler';
import { EventMapper } from './mapper/event.mapper';
import { EventConditionMapper } from './mapper/event-condition.mapper';
import { GetEventDetailQueryHandler } from './handler/query/get-event-detail.query.handler';
import { EventService } from './service/event.service';
import { EventConditionService } from './service/event-condition.service';
import { DeleteEventConditionCommandHandler } from './handler/command/delete-event-condition.command.handler';
import { ConditionValidationService } from './service/condition-validation.service';
import { InviteConditionStrategy } from './service/invite-condition.strategy';

const handlers = [
  CreateEventCommandHandler,
  UpdateEventCommandHandler,
  DeleteEventCommandHandler,
  CreateEventConditionCommandHandler,
  DeleteEventConditionCommandHandler,
];
const queries = [GetPaginatedEventQueryHandler, GetEventDetailQueryHandler];
const mappers = [EventMapper, EventConditionMapper];
const services = [
  EventService,
  EventConditionService,
  ConditionValidationService,
  InviteConditionStrategy,
];
@Module({
  imports: [],
  providers: [...handlers, ...queries, ...mappers, ...services],
  exports: [...handlers, ...queries, ...mappers, ...services],
})
export class EventModule {}
