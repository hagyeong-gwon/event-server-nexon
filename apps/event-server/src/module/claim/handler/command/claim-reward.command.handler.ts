import { Injectable } from '@nestjs/common';
import {
  InjectClaimRepository,
  InjectEventConditionRepository,
  InjectEventRepository,
  InjectRewardRepository,
} from '../../../../base/repository.inject';
import { ClaimEntity } from '../../domain/claim.entity';
import { RewardRepositoryPort } from '../../../port/repository/reward.repository.port';
import { ClaimRepositoryPort } from '../../../port/repository/claim.repository.port';
import { ClaimRewardRequestDto } from '../../../../inbound/claim/dto/claim-reward.request.dto';
import { ClaimService } from '../../service/claim.service';
import { ClaimStateEnum } from '../../../../shared/enum/claim-state.enum';
import { EventRepositoryPort } from '../../../port/repository/event.repository.port';
import { EventService } from '../../../event/service/event.service';
import { EventConditionService } from '../../../event/service/event-condition.service';
import { EventConditionRepositoryPort } from '../../../port/repository/event-condition.repository.port';
import { ConditionValidationService } from '../../../event/service/condition-validation.service';

@Injectable()
export class ClaimRewardCommandHandler {
  constructor(
    @InjectClaimRepository()
    private readonly claimRepository: ClaimRepositoryPort,
    @InjectRewardRepository()
    private readonly rewardRepository: RewardRepositoryPort,
    @InjectEventRepository()
    private readonly eventRepository: EventRepositoryPort,
    @InjectEventConditionRepository()
    private readonly eventConditionRepository: EventConditionRepositoryPort,
    private readonly eventConditionService: EventConditionService,
    private readonly eventService: EventService,
    private readonly claimService: ClaimService,
    private readonly conditionValidationService: ConditionValidationService,
  ) {}

  async execute(
    command: ClaimRewardRequestDto & { userId: string },
  ): Promise<ClaimEntity> {
    const { userId, eventConditionId } = command;

    let eventId: string;
    try {
      const eventCondition =
        await this.eventConditionRepository.findActiveOneById(eventConditionId);
      const event = await this.eventRepository.findOneById(
        eventCondition.eventId,
      );
      eventId = event.id;

      this.eventService.validateEventIsActive(event);
      this.eventConditionService.validateConditionExists(eventCondition);

      await this.claimService.validateAlreadyClaim(userId, eventConditionId);

      const rewards =
        await this.rewardRepository.findActiveAllByConditionId(
          eventConditionId,
        );
      const rewardIds = rewards.map((reward) => reward.id);

      const claim = ClaimEntity.create({
        userId,
        eventId,
        eventConditionId,
        rewardIds,
        status: ClaimStateEnum.PENDING,
      });

      try {
        const validateResult = await this.conditionValidationService.validate({
          userId,
          eventCondition,
        });
        if (!validateResult) {
          claim.setStatus(ClaimStateEnum.FAILED);
          claim.setReason('이벤트 조건에 충족되지 않았습니다.');
        }
      } catch (e) {
        claim.setStatus(ClaimStateEnum.FAILED);
        claim.setReason(e.message);
      }

      console.log(claim);

      return this.claimRepository.saveOne(claim);
    } catch (e) {
      const claim = ClaimEntity.create({
        userId,
        eventId,
        eventConditionId,
        rewardIds: [],
        status: ClaimStateEnum.FAILED,
        reason: e?.response?.message || e.message,
      });
      await this.claimRepository.saveOne(claim);
      throw new Error(e?.response?.message || e.message);
    }
  }
}
