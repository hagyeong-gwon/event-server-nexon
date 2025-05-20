import { UserOrmType } from '../../../outbound/database/user/user.type';
import { UserEntity } from '../domain/user.entity';
import { ObjectId } from '../../../shared/helper/object-id.helper';

export class UserMapper {
  static toDomain(doc: UserOrmType): UserEntity {
    if (!doc) {
      return null;
    }

    return new UserEntity({
      id: doc._id.toString(),
      email: doc.email,
      passwordHash: doc.passwordHash,
      roles: doc.roles,
      createdAt: doc.createdAt,
    });
  }
  static toPersistence(user: UserEntity): Partial<UserOrmType> {
    if (!user) {
      return null;
    }
    return {
      id: ObjectId(user.id),
      email: user.email,
      passwordHash: user.passwordHash,
      roles: user.roles,
      createdAt: user.createdAt,
    };
  }
}
