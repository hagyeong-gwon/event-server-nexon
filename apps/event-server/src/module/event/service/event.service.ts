import { Injectable } from '@nestjs/common';
import { EventEntity } from '../domain/event.entity';
import {
  IS_NOT_ACTIVE_EVENT_MSG,
  NOT_FOUND_EVENT_MSG,
} from '../../../shared/constant/error-msg.constants';
import { EventRepositoryPort } from '../../port/repository/event.repository.port';
import { InjectEventRepository } from '../../../base/repository.inject';

@Injectable()
export class EventService {
  constructor(
    @InjectEventRepository()
    private readonly eventRepository: EventRepositoryPort,
  ) {}

  async validateEventExists(eventId: string): Promise<void> {
    const event = await this.eventRepository.findOneById(eventId);
    if (!event) {
      throw new Error(NOT_FOUND_EVENT_MSG);
    }
  }
  validateEventIsActive(event: EventEntity): void {
    if (!event.isActive()) {
      throw new Error(IS_NOT_ACTIVE_EVENT_MSG);
    }
  }
}
