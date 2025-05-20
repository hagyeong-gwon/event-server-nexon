import { Body, Controller, Get, Post } from '@nestjs/common';
import { ResponseDto } from '../../shared/dto/response.dto';
import { successResponse } from '../../shared/helper/response.helper';
import { ClaimRewardCommandHandler } from '../../module/claim/handler/command/claim-reward.command.handler';
import { ClaimRewardRequestDto } from './dto/claim-reward.request.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginUser } from '../../shared/decorator/login-user.decorator';
import { GetMyClaimQueryHandler } from '../../module/claim/handler/query/get-my-claim.query.handler';

@ApiTags('Claim')
@ApiBearerAuth()
@Controller('api/claim')
export class ClaimController {
  constructor(
    private readonly claimRewardCommandHandler: ClaimRewardCommandHandler,
    private readonly getMyClaimQueryHandler: GetMyClaimQueryHandler,
  ) {}

  @Post()
  @ApiOperation({
    summary: '보상 요청 API',
    description: '보상 지급을 요청한다.',
  })
  async claimReward(
    @Body() body: ClaimRewardRequestDto,
    @LoginUser('userId') userId: string,
  ): Promise<ResponseDto> {
    const reward = await this.claimRewardCommandHandler.execute({
      ...body,
      userId,
    });
    return successResponse(reward);
  }

  @Get()
  @ApiOperation({
    summary: '보상 요청 이력 조회 API',
    description: '본인의 보상 요청 이력을 조회한다.',
  })
  async getClaimReward(
    @LoginUser('userId') userId: string,
  ): Promise<ResponseDto> {
    return successResponse(await this.getMyClaimQueryHandler.execute(userId));
  }
}
