import { Injectable } from '@nestjs/common';
import { InjectEventConditionRepository } from '../../../../base/repository.inject';
import { EventConditionRepositoryPort } from '../../../port/repository/event-condition.repository.port';

@Injectable()
export class DeleteEventConditionCommandHandler {
  constructor(
    @InjectEventConditionRepository()
    private readonly eventConditionRepository: EventConditionRepositoryPort,
  ) {}

  async execute(conditionId: string): Promise<any> {
    await this.eventConditionRepository.deleteByConditionId(conditionId);
    return {
      message: 'Event condition deleted successfully',
      data: conditionId,
    };
  }
}
