import { Injectable } from '@nestjs/common';
import { InjectClaimRepository } from '../../../../base/repository.inject';
import { ClaimRepositoryPort } from '../../../port/repository/claim.repository.port';
import { ClaimEntity } from '../../domain/claim.entity';

@Injectable()
export class GetMyClaimQueryHandler {
  constructor(
    @InjectClaimRepository()
    private readonly claimRepository: ClaimRepositoryPort,
  ) {}

  async execute(userId: string): Promise<ClaimEntity[]> {
    return await this.claimRepository.findAllByUserId(userId);
  }
}
