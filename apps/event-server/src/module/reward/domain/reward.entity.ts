import { RewardTypeEnum } from '../../../shared/enum/reward-type.enum';
import { MetadataType } from '../../../shared/type/metadata.type';

export type RewardProps = {
  id?: string;
  eventConditionId: string;
  description: string;
  isLive: boolean;
  rewardType: RewardTypeEnum;
  metadata: MetadataType;
  qty: number;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
};

export class RewardEntity {
  public readonly id: string;
  public readonly eventConditionId: string;
  public readonly description: string;
  public readonly isLive: boolean;
  public readonly rewardType: RewardTypeEnum;
  public readonly metadata: MetadataType;
  public readonly qty: number;
  public readonly createdBy?: string;
  public readonly updatedBy?: string;
  public readonly createdAt?: Date;

  constructor(props: RewardProps) {
    this.id = props.id;
    this.eventConditionId = props.eventConditionId;
    this.description = props.description;
    this.isLive = props.isLive;
    this.metadata = props.metadata;
    this.qty = props.qty;
    this.rewardType = props.rewardType;
    this.createdBy = props.createdBy || '';
    this.updatedBy = props.updatedBy || '';
    this.createdAt = props.createdAt || new Date();
  }

  public static create({
    eventConditionId,
    description,
    rewardType,
    metadata,
    qty,
  }): RewardEntity {
    const props: RewardProps = {
      eventConditionId,
      description,
      isLive: true,
      rewardType,
      metadata,
      qty,
    };
    return new RewardEntity(props);
  }
}
