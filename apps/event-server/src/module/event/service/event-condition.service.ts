import { BadRequestException, Injectable } from '@nestjs/common';
import { EventConditionEntity } from '../domain/event-condition.entity';
import { NOT_FOUND_EVENT_CONDITION_MSG } from '../../../shared/constant/error-msg.constants';

@Injectable()
export class EventConditionService {
  constructor() {}
  validateConditionExists(eventCondition: EventConditionEntity): void {
    if (!eventCondition) {
      throw new BadRequestException(NOT_FOUND_EVENT_CONDITION_MSG);
    }
  }
}
