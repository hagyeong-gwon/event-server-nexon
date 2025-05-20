import { Injectable } from '@nestjs/common';
import { InjectEventConditionRepository } from '../../../../base/repository.inject';
import { EventConditionRepositoryPort } from '../../../port/repository/event-condition.repository.port';
import { EventConditionEntity } from '../../domain/event-condition.entity';
import { CreateEventConditionRequestDto } from '../../../../inbound/event/dto/create-event-condition.request.dto';
import { EventService } from '../../service/event.service';

@Injectable()
export class CreateEventConditionCommandHandler {
  constructor(
    @InjectEventConditionRepository()
    private readonly eventConditionRepository: EventConditionRepositoryPort,
    private readonly eventService: EventService,
  ) {}

  async execute(command: CreateEventConditionRequestDto): Promise<any> {
    await this.eventService.validateEventExists(command.eventId);

    const eventCondition = EventConditionEntity.create(command);
    return this.eventConditionRepository.saveOne(eventCondition);
  }
}
