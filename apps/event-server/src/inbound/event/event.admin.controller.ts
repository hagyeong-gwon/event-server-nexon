import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateEventCommandHandler } from '../../module/event/handler/command/create-event.command.handler';
import { CreateEventRequestDto } from './dto/create-event.request.dto';
import { CreateEventConditionCommandHandler } from '../../module/event/handler/command/create-event-condition.command.handler';
import { CreateEventConditionRequestDto } from './dto/create-event-condition.request.dto';
import { GetPaginatedEventQueryHandler } from '../../module/event/handler/query/get-paginated-event.query.handler';
import { successResponse } from '../../shared/helper/response.helper';
import { GetEventListRequestDto } from './dto/get-event-list.request.dto';
import { GetEventDetailQueryHandler } from '../../module/event/handler/query/get-event-detail.query.handler';
import { ResponseDto } from '../../shared/dto/response.dto';
import { DeleteEventConditionRequestDto } from './dto/delete-event-condition.request.dto';
import { DeleteEventConditionCommandHandler } from '../../module/event/handler/command/delete-event-condition.command.handler';

@ApiTags('Event')
@ApiBearerAuth()
@Controller('admin/event')
export class EventAdminController {
  constructor(
    private readonly createEventHandler: CreateEventCommandHandler,
    private readonly createEventConditionHandler: CreateEventConditionCommandHandler,
    private readonly getPaginatedEventQueryHandler: GetPaginatedEventQueryHandler,
    private readonly getEventDetailQueryHandler: GetEventDetailQueryHandler,
    private readonly deleteEventConditionHandler: DeleteEventConditionCommandHandler,
  ) {}
  @Get()
  @ApiOperation({
    summary: '이벤트 조회 API',
    description: '이벤트를 조회한다.',
  })
  async getEventList(
    @Query()
    query: GetEventListRequestDto,
  ): Promise<ResponseDto> {
    return successResponse(
      await this.getPaginatedEventQueryHandler.execute({
        page: query.page,
        size: query.size,
        orderBy: query.orderBy,
      }),
    );
  }

  @Get(':eventId')
  @ApiOperation({
    summary: '이벤트 상세 조회 API',
    description: '이벤트를 상세 조회한다.',
  })
  async getEventDetail(
    @Param('eventId') eventId: string,
  ): Promise<ResponseDto> {
    return successResponse(
      await this.getEventDetailQueryHandler.execute(eventId),
    );
  }

  @Post()
  @ApiOperation({
    summary: '이벤트 생성 API',
    description: '이벤트를 생성한다.',
  })
  async createEvent(@Body() body: CreateEventRequestDto): Promise<ResponseDto> {
    return successResponse(await this.createEventHandler.execute(body));
  }

  @Post('event-condition')
  @ApiOperation({
    summary: '이벤트 조건 생성 API',
    description: '이벤트 조건을 생성한다.',
  })
  async createEventCondition(
    @Body() body: CreateEventConditionRequestDto,
  ): Promise<ResponseDto> {
    return successResponse(
      await this.createEventConditionHandler.execute(body),
    );
  }

  @Delete('event-condition')
  @ApiOperation({
    summary: '이벤트 조건 삭제 API',
    description: '이벤트 조건을 삭제한다.',
  })
  async deleteEventCondition(
    @Body() body: DeleteEventConditionRequestDto,
  ): Promise<ResponseDto> {
    return successResponse(
      await this.deleteEventConditionHandler.execute(body.conditionId),
    );
  }
}
