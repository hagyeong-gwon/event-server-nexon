import { BaseModelInterface } from '../base-model.interface';

export interface EventOrmType extends BaseModelInterface {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  isLive: boolean;
  condition: string;
  conditionDetail: Record<string, any>;
}
