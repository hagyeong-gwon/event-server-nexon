import { ClaimStateEnum } from '../../../shared/enum/claim-state.enum';

export type ClaimProps = {
  id?: string;
  eventId: string;
  eventConditionId: string;
  rewardIds?: string[];
  userId: string;
  status: string;
  reason?: string;
  requestedAt: Date;
};

export class ClaimEntity {
  public id: string;
  public userId: string;
  public eventId: string;
  public eventConditionId: string;
  public rewardIds?: string[];
  public status: string;
  public reason: string;
  public requestedAt: Date;

  constructor(props: ClaimProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.eventConditionId = props.eventConditionId;
    this.eventId = props.eventId;
    this.rewardIds = props.rewardIds;
    this.status = props.status;
    this.reason = props.reason;
    this.requestedAt = props.requestedAt || new Date();
  }
  static create({
    userId,
    eventId,
    eventConditionId,
    rewardIds,
    status,
    reason = '',
  }): ClaimEntity {
    return new ClaimEntity({
      userId,
      eventId,
      eventConditionId,
      rewardIds,
      status,
      reason,
      requestedAt: new Date(),
    });
  }

  setStatus(status: ClaimStateEnum) {
    this.status = status;
  }

  setReason(reason: string) {
    this.reason = reason;
  }
}
