import { Injectable } from '@nestjs/common';
import { InjectEventConditionRepository } from '../../../../base/repository.inject';
import { EventConditionRepositoryPort } from '../../../port/repository/event-condition.repository.port';
import { EventConditionEntity } from '../../domain/event-condition.entity';

@Injectable()
export class GetEventDetailQueryHandler {
  constructor(
    @InjectEventConditionRepository()
    private readonly eventConditionRepository: EventConditionRepositoryPort,
  ) {}

  async execute(id: string): Promise<EventConditionEntity[]> {
    return await this.eventConditionRepository.findAllByEventId(id);
  }
}
