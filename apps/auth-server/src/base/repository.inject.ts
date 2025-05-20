import { Inject } from '@nestjs/common';

export function InjectUserRepository() {
  return Inject('UserRepository');
}

export function InjectInviteRepository() {
  return Inject('InviteRepository');
}
