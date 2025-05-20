import { Injectable } from '@nestjs/common';
import { InjectEventRepository } from '../../../../base/repository.inject';
import { EventRepositoryPort } from '../../../port/repository/event.repository.port';

@Injectable()
export class GetPaginatedEventQueryHandler {
  constructor(
    @InjectEventRepository()
    private readonly eventRepository: EventRepositoryPort,
  ) {}

  async execute({ page, size, orderBy }): Promise<Record<string, any>> {
    const skip = page * size;

    const events = await this.eventRepository.findPaginatedEvents(
      skip,
      size + 1,
      orderBy,
    );
    const hasNext = size < events.length;

    return {
      events: events.slice(0, size),
      hasNext,
    };
  }
}
