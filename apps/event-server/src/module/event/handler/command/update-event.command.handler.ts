import { Injectable } from '@nestjs/common';
import { CreateEventRequestDto } from '../../../../inbound/event/dto/create-event.request.dto';

@Injectable()
export class UpdateEventCommandHandler {
  constructor() {}

  async execute(command: CreateEventRequestDto): Promise<any> {
    return {
      message: 'Event created successfully',
      data: command,
    };
  }
}
