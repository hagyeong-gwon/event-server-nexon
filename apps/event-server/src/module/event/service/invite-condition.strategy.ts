import {
  ConditionContext,
  ConditionValidationStrategy,
} from './condition-validation.strategy';
import { Injectable } from '@nestjs/common';
import { AuthGrpcService } from '../../../outbound/grpc/auth.grpc.service';

@Injectable()
export class InviteConditionStrategy implements ConditionValidationStrategy {
  constructor(private readonly authGrpcService: AuthGrpcService) {}
  async validate(context: ConditionContext): Promise<boolean> {
    const { userId, eventCondition } = context;

    const count = await this.authGrpcService.getInviteCountInfo(userId);

    return eventCondition.value <= count;
  }
}
