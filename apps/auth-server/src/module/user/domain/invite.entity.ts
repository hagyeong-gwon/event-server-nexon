export type InviteProps = {
  id?: string;
  userId: string;
  invitedUserEmail: string;
  userEmail: string;
  isSignUp: boolean;
  createdAt: Date;
};

export class InviteEntity {
  public readonly id?: string;
  public readonly userId: string;
  public readonly invitedUserEmail: string;
  public readonly userEmail: string;
  public readonly isSignUp: boolean;
  public readonly createdAt: Date;
  constructor(props: InviteProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.invitedUserEmail = props.invitedUserEmail;
    this.userEmail = props.userEmail;
    this.isSignUp = props.isSignUp;
    this.createdAt = props.createdAt;
  }

  public static create({ userId, invitedUserEmail, userEmail }) {
    return new InviteEntity({
      userId,
      invitedUserEmail,
      userEmail,
      isSignUp: false,
      createdAt: new Date(),
    });
  }
}
