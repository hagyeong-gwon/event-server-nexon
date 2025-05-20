import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { GIVE_REWARD } from '../../shared/constant/on-event-name.constants';

@Injectable()
export class RewardMessageListener {
  private readonly logger = new Logger(RewardMessageListener.name);

  constructor() {}

  @OnEvent(GIVE_REWARD)
  async rewardClaimed(payload: { userId: string; rewardId: string }) {
    // 보상 지급 로직 구현
    this.logger.log(
      `지급 대상: ${payload.userId}, 보상 ID: ${payload.rewardId}`,
    );
  }
}
