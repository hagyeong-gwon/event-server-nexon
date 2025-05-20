import { Injectable } from '@nestjs/common';
import { InjectClaimRepository } from '../../../../base/repository.inject';
import { ClaimRepositoryPort } from '../../../port/repository/claim.repository.port';
import { ClaimStateEnum } from '../../../../shared/enum/claim-state.enum';

@Injectable()
export class UpdateClaimStatusCommandHandler {
  constructor(
    @InjectClaimRepository()
    private readonly claimRepository: ClaimRepositoryPort,
  ) {}
  async execute(id: string, status: ClaimStateEnum) {
    await this.claimRepository.findAndUpdateStatus(id, status);
  }
}
