import { Inject } from '@nestjs/common';

export function InjectEventRepository() {
  return Inject('EventRepository');
}

export function InjectRewardRepository() {
  return Inject('RewardRepository');
}

export function InjectClaimRepository() {
  return Inject('ClaimRepository');
}

export function InjectEventConditionRepository() {
  return Inject('EventConditionRepository');
}
