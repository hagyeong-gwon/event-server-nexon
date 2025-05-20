import { Injectable } from '@nestjs/common';
import { EventConditionEnum } from '../../../shared/enum/event-condition.enum';
import {
  ConditionContext,
  ConditionValidationStrategy,
} from './condition-validation.strategy';
import { InviteConditionStrategy } from './invite-condition.strategy';
import { WRONG_CONDITION_TYPE } from '../../../shared/constant/error-msg.constants';

@Injectable()
export class ConditionValidationService {
  private strategies: Map<EventConditionEnum, ConditionValidationStrategy> =
    new Map();

  constructor(private readonly inviteStrategy: InviteConditionStrategy) {
    this.strategies.set(EventConditionEnum.INVITE, inviteStrategy);
    // this.strategies.set(EventConditionEnum.LOGIN);
    // this.strategies.set(EventConditionEnum.PURCHASE);
    // this.strategies.set(EventConditionEnum.QUIZ);
  }

  async validate(context: ConditionContext) {
    const type = context.eventCondition.conditionType;
    const strategy = this.strategies.get(type);
    if (!strategy) throw new Error(WRONG_CONDITION_TYPE);
    return strategy.validate(context);
  }
}
