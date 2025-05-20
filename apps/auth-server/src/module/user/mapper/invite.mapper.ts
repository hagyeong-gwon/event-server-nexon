import { InviteOrmType } from '../../../outbound/database/invite/invite.type';
import { InviteEntity } from '../domain/invite.entity';
import { ObjectId } from '../../../shared/helper/object-id.helper';

export class InviteMapper {
  static toDomain(doc: InviteOrmType): InviteEntity {
    if (!doc) {
      return null;
    }

    return new InviteEntity({
      id: doc._id.toString(),
      userId: doc.userId.toString(),
      isSignUp: doc.isSignUp,
      invitedUserEmail: doc.invitedUserEmail,
      userEmail: doc.userEmail,
      createdAt: doc.createdAt,
    });
  }
  static toPersistence(domain: InviteEntity): Partial<InviteOrmType> {
    if (!domain) {
      return null;
    }
    return {
      id: ObjectId(domain.id),
      userId: ObjectId(domain.userId),
      invitedUserEmail: domain.invitedUserEmail,
      userEmail: domain.userEmail,
      isSignUp: domain.isSignUp,
      createdAt: domain.createdAt,
    };
  }
}
