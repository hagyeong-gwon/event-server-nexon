import { Injectable } from '@nestjs/common';
import { MongoBaseRepository } from '../base-mongo.repository';
import { InviteEntity } from '../../../module/user/domain/invite.entity';
import { InviteOrmType } from './invite.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InviteMapper } from '../../../module/user/mapper/invite.mapper';
import { InviteRepositoryPort } from '../../../module/port/repository/invite.repository.port';
import { ObjectId } from '../../../shared/helper/object-id.helper';

@Injectable()
export class InviteRepository
  extends MongoBaseRepository<InviteEntity, InviteOrmType>
  implements InviteRepositoryPort
{
  constructor(
    @InjectModel('Invite', 'db')
    private readonly inviteModel: Model<InviteOrmType>,
  ) {
    super(inviteModel, InviteMapper);
  }

  async findSignUpAllByUserId(userId: string) {
    const docs = await this.inviteModel.find({
      userId: ObjectId(userId),
      isSignUp: true,
    });
    return docs.map((doc) => InviteMapper.toDomain(doc));
  }

  async findAndUpdateIsSignUp(
    invitedByUserEmail: string,
    signUpUserEmail: string,
  ) {
    await this.inviteModel.updateOne(
      {
        userEmail: invitedByUserEmail,
        invitedUserEmail: signUpUserEmail,
        isSignUp: false,
      },
      {
        isSignUp: true,
      },
    );
  }
}
