import { Module } from '@nestjs/common';
import { ClaimRewardCommandHandler } from './handler/command/claim-reward.command.handler';
import { ClaimService } from './service/claim.service';
import { GetPaginatedClaimQueryHandler } from './handler/query/get-paginated-claim.query.handler';
import { GetMyClaimQueryHandler } from './handler/query/get-my-claim.query.handler';
import { UpdateClaimStatusCommandHandler } from './handler/command/update-claim-status.command.handler';

const handlers = [ClaimRewardCommandHandler];
const queries = [
  GetPaginatedClaimQueryHandler,
  GetMyClaimQueryHandler,
  UpdateClaimStatusCommandHandler,
];
const services = [ClaimService];

@Module({
  imports: [],
  providers: [...handlers, ...services, ...queries],
  exports: [...handlers, ...services, ...queries],
})
export class ClaimModule {}
