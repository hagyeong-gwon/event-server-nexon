import { UserEntity } from '../../user/domain/user.entity';
import { UserOrmType } from '../../../outbound/database/user/user.type';
import { MongoBaseRepository } from '../../../outbound/database/base-mongo.repository';

export abstract class UserRepositoryPort extends MongoBaseRepository<
  UserEntity,
  UserOrmType
> {
  abstract findOneByEmail(email: string): Promise<UserEntity | null>;
}
