import { EventConditionEntity } from '../domain/event-condition.entity';

export interface ConditionContext {
  userId: string;
  eventCondition: EventConditionEntity;
}

export interface ConditionValidationStrategy {
  validate(context: ConditionContext): Promise<boolean>;
}
