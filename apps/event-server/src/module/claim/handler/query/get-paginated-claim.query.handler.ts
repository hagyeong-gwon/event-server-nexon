import { Injectable } from '@nestjs/common';
import { InjectClaimRepository } from '../../../../base/repository.inject';
import { ClaimRepositoryPort } from '../../../port/repository/claim.repository.port';
import { GetClaimListRequestDto } from '../../../../inbound/claim/dto/get-claim-list.request.dto';

@Injectable()
export class GetPaginatedClaimQueryHandler {
  constructor(
    @InjectClaimRepository()
    private readonly claimRepository: ClaimRepositoryPort,
  ) {}

  async execute({
    page,
    size,
    status,
    orderBy,
  }: GetClaimListRequestDto): Promise<Record<string, any>> {
    const skip = page * size;

    const claims = await this.claimRepository.findPaginatedClaims(
      skip,
      size + 1,
      status,
      orderBy,
    );
    const hasNext = size < claims.length;

    return {
      claims: claims.slice(0, size),
      hasNext,
    };
  }
}
