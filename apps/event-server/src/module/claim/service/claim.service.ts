import { BadRequestException, Injectable } from '@nestjs/common';
import { ClaimRepositoryPort } from '../../port/repository/claim.repository.port';
import { ClaimStateEnum } from '../../../shared/enum/claim-state.enum';
import { ALREADY_EXISTS_CLAIM_MSG } from '../../../shared/constant/error-msg.constants';
import { InjectClaimRepository } from '../../../base/repository.inject';

@Injectable()
export class ClaimService {
  constructor(
    @InjectClaimRepository()
    private readonly claimRepository: ClaimRepositoryPort,
  ) {}
  async validateAlreadyClaim(
    userId: string,
    eventConditionId: string,
  ): Promise<void> {
    const claim = await this.claimRepository.findOneByUserIdAndConditionId(
      userId,
      eventConditionId,
      [
        ClaimStateEnum.APPROVED,
        ClaimStateEnum.PENDING,
        ClaimStateEnum.IN_PROGRESS,
        ClaimStateEnum.COMPLETED,
      ],
    );
    if (claim) {
      throw new BadRequestException(ALREADY_EXISTS_CLAIM_MSG);
    }
  }
}
