import { MongoBaseRepository } from '../../../outbound/database/base-mongo.repository';
import { InviteEntity } from '../../user/domain/invite.entity';
import { InviteOrmType } from '../../../outbound/database/invite/invite.type';

export abstract class InviteRepositoryPort extends MongoBaseRepository<
  InviteEntity,
  InviteOrmType
> {
  abstract findSignUpAllByUserId(userId: string): Promise<InviteEntity[]>;
  abstract findAndUpdateIsSignUp(
    invitedByUserEmail: string,
    signUpUserEmail: string,
  ): Promise<void>;
}
