import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ResponseDto } from '../../shared/dto/response.dto';
import { successResponse } from '../../shared/helper/response.helper';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetClaimListRequestDto } from './dto/get-claim-list.request.dto';
import { GetPaginatedClaimQueryHandler } from '../../module/claim/handler/query/get-paginated-claim.query.handler';
import { UpdateClaimStatusRequestDto } from './dto/update-claim-status.request.dto';
import { UpdateClaimStatusCommandHandler } from '../../module/claim/handler/command/update-claim-status.command.handler';

@ApiBearerAuth()
@ApiTags('Claim')
@Controller('admin/claim')
export class ClaimAdminController {
  constructor(
    private readonly getPaginatedClaimQueryHandler: GetPaginatedClaimQueryHandler,
    private readonly updateClaimStatusCommandHandler: UpdateClaimStatusCommandHandler,
  ) {}

  @ApiOperation({
    summary: '보상 요청 조회 API',
    description: '보상 요청을 조회한다.',
  })
  @Get()
  async getClaimReward(
    @Query()
    query: GetClaimListRequestDto,
  ): Promise<ResponseDto> {
    return successResponse(
      await this.getPaginatedClaimQueryHandler.execute(query),
    );
  }

  @ApiOperation({
    summary: '보상 요청 상태 변경 API',
    description: '보상 요청 상태를 변경한다.',
  })
  @Post()
  async updateClaimStatus(
    @Body()
    body: UpdateClaimStatusRequestDto,
  ): Promise<ResponseDto> {
    return successResponse(
      await this.updateClaimStatusCommandHandler.execute(body.id, body.status),
    );
  }
}
