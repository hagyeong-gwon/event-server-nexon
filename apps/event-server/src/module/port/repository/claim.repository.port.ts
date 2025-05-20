import { MongoBaseRepository } from '../../../outbound/database/base-mongo.repository';
import { ClaimOrmType } from '../../../outbound/database/claim/claim.type';
import { ClaimEntity } from '../../claim/domain/claim.entity';
import { ClaimStateEnum } from '../../../shared/enum/claim-state.enum';

export abstract class ClaimRepositoryPort extends MongoBaseRepository<
  ClaimEntity,
  ClaimOrmType
> {
  abstract findOneByUserIdAndConditionId(
    userId: string,
    eventConditionId: string,
    status: ClaimStateEnum[],
  ): Promise<ClaimEntity>;

  abstract findPaginatedClaims(
    skip: number,
    size: number,
    status?: ClaimStateEnum,
    orderBy?: string,
  ): Promise<ClaimEntity[]>;
  abstract findAllByUserId(userId: string): Promise<ClaimEntity[]>;
  abstract findAndUpdateStatus(
    id: string,
    status: ClaimStateEnum,
  ): Promise<void>;
}
