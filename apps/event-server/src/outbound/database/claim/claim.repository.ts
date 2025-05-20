import { Injectable } from '@nestjs/common';
import { MongoBaseRepository } from '../base-mongo.repository';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Promise, Types } from 'mongoose';
import { ClaimEntity } from '../../../module/claim/domain/claim.entity';
import { ClaimOrmType } from './claim.type';
import { ClaimRepositoryPort } from '../../../module/port/repository/claim.repository.port';
import { ClaimMapper } from '../../../module/claim/mapper/claim.mapper';
import { ClaimStateEnum } from '../../../shared/enum/claim-state.enum';
import { ObjectId } from '../../../shared/helper/object-id.helper';

@Injectable()
export class ClaimRepository
  extends MongoBaseRepository<ClaimEntity, ClaimOrmType>
  implements ClaimRepositoryPort
{
  constructor(
    @InjectModel('Claim', 'db')
    private readonly claimModel: Model<ClaimOrmType>,
  ) {
    super(claimModel, ClaimMapper);
  }

  async findAllByUserId(userId: string): Promise<ClaimEntity[]> {
    const docs = await this.claimModel
      .find({
        userId: ObjectId(userId),
      })
      .sort({ _id: -1 })
      .exec();
    return docs.map((doc) => ClaimMapper.toDomain(doc));
  }

  async findPaginatedClaims(
    skip: number,
    size: number,
    status?: ClaimStateEnum,
    orderBy?: string,
  ): Promise<ClaimEntity[]> {
    const docs = await this.claimModel
      .find({
        ...(status && { status }),
      })
      .sort({ [orderBy || '_id']: -1 })
      .skip(skip)
      .limit(skip + size)
      .exec();

    return docs.map((doc) => ClaimMapper.toDomain(doc));
  }

  async findOneByUserIdAndConditionId(
    userId: string,
    eventConditionId: string,
    status: ClaimStateEnum[],
  ): Promise<ClaimEntity> {
    const doc = await this.claimModel
      .findOne({
        userId: ObjectId(userId),
        eventConditionId: ObjectId(eventConditionId),
        status: { $in: status },
      })
      .exec();
    return ClaimMapper.toDomain(doc);
  }

  async findAndUpdateStatus(id: string, status: ClaimStateEnum) {
    await this.claimModel.updateOne({ _id: ObjectId(id) }, { status });
  }
}
