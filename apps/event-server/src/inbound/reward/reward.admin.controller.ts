import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateRewardRequestDto } from './dto/create-reward.request.dto';
import { CreateRewardCommandHandler } from '../../module/reward/handler/command/create-reward.command.handler';
import { ResponseDto } from '../../shared/dto/response.dto';
import { successResponse } from '../../shared/helper/response.helper';
import { SearchRewardRequestDto } from './dto/search-reward.request.dto';
import { SearchRewardQueryHandler } from '../../module/reward/handler/query/search-reward.query.handler';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Reward')
@ApiBearerAuth()
@Controller('admin/reward')
export class RewardAdminController {
  constructor(
    private readonly createRewardCommandHandler: CreateRewardCommandHandler,
    private readonly searchRewardCommandHandler: SearchRewardQueryHandler,
  ) {}

  @ApiOperation({
    summary: '보상 생성 API',
    description:
      '특정 이벤트 조건을 충족했을 때 사용자에게 지급할 보상을 생성합니다.',
  })
  @Post()
  async createReward(
    @Body() body: CreateRewardRequestDto,
  ): Promise<ResponseDto> {
    const reward = await this.createRewardCommandHandler.execute(body);
    return successResponse(reward);
  }

  @ApiOperation({
    summary: '보상 조회 API',
    description: '특정 이벤트 조건에 대한 보상을 조회합니다.',
  })
  @Get()
  async searchReward(
    @Query() query: SearchRewardRequestDto,
  ): Promise<ResponseDto> {
    const { eventConditionId } = query;
    const rewards =
      await this.searchRewardCommandHandler.execute(eventConditionId);
    return successResponse(rewards);
  }
}
