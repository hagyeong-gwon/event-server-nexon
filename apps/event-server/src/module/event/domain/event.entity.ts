import { nowKSTString, toKSTString } from '../../../shared/helper/time.helper';

export type EventProps = {
  id?: string;
  title: string;
  description: string;
  isLive: boolean;
  startDate: string;
  endDate: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  deletedBy?: string;
};

export class EventEntity {
  public readonly id: string;
  public readonly title: string;
  public readonly description: string;
  public readonly isLive: boolean;
  public readonly startDate: string;
  public readonly endDate: string;
  public readonly createdBy: string;
  public readonly updatedBy: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date;
  public readonly deletedBy: string;

  constructor(props: EventProps) {
    this.id = props.id;
    this.title = props.title;
    this.description = props.description;
    this.isLive = props.isLive;
    this.startDate = props.startDate;
    this.endDate = props.endDate;
    this.createdBy = props.createdBy || '';
    this.updatedBy = props.updatedBy || '';
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
    this.deletedBy = props.deletedBy;
  }

  public static create({
    title,
    description,
    isLive,
    startDate,
    endDate,
  }): EventEntity {
    const props: EventProps = {
      title,
      description,
      isLive,
      startDate: toKSTString(new Date(startDate)),
      endDate: toKSTString(new Date(endDate)),
    };
    return new EventEntity(props);
  }
  /**
   * 현재 시간 기준으로 이벤트가 활성 상태인지 확인
   */
  isActive(): boolean {
    const now = nowKSTString();

    return this.isLive && now >= this.startDate && now <= this.endDate;
  }
}
