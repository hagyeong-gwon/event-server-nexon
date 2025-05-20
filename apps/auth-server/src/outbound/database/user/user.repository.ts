import { Injectable } from '@nestjs/common';
import { MongoBaseRepository } from '../base-mongo.repository';
import { UserEntity } from '../../../module/user/domain/user.entity';
import { UserOrmType } from './user.type';
import { InjectModel } from '@nestjs/mongoose';
import { UserMapper } from '../../../module/user/mapper/user.mapper';
import { UserRepositoryPort } from '../../../module/port/repository/user.repository.port';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository
  extends MongoBaseRepository<UserEntity, UserOrmType>
  implements UserRepositoryPort
{
  constructor(
    @InjectModel('User', 'db') private readonly userModel: Model<UserOrmType>,
  ) {
    super(userModel, UserMapper);
  }

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.userModel.findOne({ email });
    return this.mapper.toDomain(user);
  }
}
