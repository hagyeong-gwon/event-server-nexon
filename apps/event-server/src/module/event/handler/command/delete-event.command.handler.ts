import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteEventCommandHandler {
  constructor() {}

  async execute(eventId: string): Promise<any> {
    return {
      message: 'Event created successfully',
      data: eventId,
    };
  }
}
