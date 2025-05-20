import { RolesEnum } from '../../../shared/enum/roles.enum';

export type UserProps = {
  id?: string;
  email: string;
  passwordHash: string;
  roles: RolesEnum[];
  createdAt: Date;
};
export class UserEntity {
  public readonly id?: string;
  public readonly email: string;
  public readonly passwordHash: string;
  public readonly roles: RolesEnum[];
  public readonly createdAt: Date;

  constructor(props: UserProps) {
    this.id = props.id;
    this.email = props.email;
    this.passwordHash = props.passwordHash;
    this.roles = props.roles;
    this.createdAt = props.createdAt || new Date();
  }

  public static create(user: {
    roles: RolesEnum[];
    email: string;
    passwordHash: string;
  }): UserEntity {
    return new UserEntity({
      email: user.email,
      passwordHash: user.passwordHash,
      roles: user.roles,
      createdAt: new Date(),
    });
  }
}
