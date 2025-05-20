import { BaseModelInterface } from '../base-model.interface';
import { RolesEnum } from '../../../shared/enum/roles.enum';

export interface UserOrmType extends BaseModelInterface {
  email: string;
  passwordHash: string;
  roles: RolesEnum[];
}
