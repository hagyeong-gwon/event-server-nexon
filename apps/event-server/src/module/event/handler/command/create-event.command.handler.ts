import { Injectable } from '@nestjs/common';
import { EventRepositoryPort } from '../../../port/repository/event.repository.port';
import { EventEntity } from '../../domain/event.entity';
import { InjectEventRepository } from '../../../../base/repository.inject';
import { CreateEventRequestDto } from '../../../../inbound/event/dto/create-event.request.dto';

@Injectable()
export class CreateEventCommandHandler {
  constructor(
    @InjectEventRepository()
    private readonly eventRepository: EventRepositoryPort,
  ) {}

  async execute(command: CreateEventRequestDto): Promise<EventEntity> {
    const event = EventEntity.create(command);
    return await this.eventRepository.saveOne(event);
  }
}
