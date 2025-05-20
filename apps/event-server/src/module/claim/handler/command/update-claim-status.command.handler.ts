import { Injectable } from '@nestjs/common';
import { InjectClaimRepository } from '../../../../base/repository.inject';
import { ClaimRepositoryPort } from '../../../port/repository/claim.repository.port';
import { ClaimStateEnum } from '../../../../shared/enum/claim-state.enum';
import { GIVE_REWARD } from '../../../../shared/constant/on-event-name.constants';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class UpdateClaimStatusCommandHandler {
  constructor(
    @InjectClaimRepository()
    private readonly claimRepository: ClaimRepositoryPort,
    private eventEmitter: EventEmitter2,
  ) {}
  async execute(id: string, status: ClaimStateEnum) {
    await this.claimRepository.findAndUpdateStatus(id, status);

    if (status === ClaimStateEnum.APPROVED) {
      const claim = await this.claimRepository.findOneById(id);

      claim.rewardIds.forEach((id) =>
        this.eventEmitter.emit(GIVE_REWARD, {
          userId: claim.userId,
          rewardId: id,
        }),
      );
    }
  }
}
