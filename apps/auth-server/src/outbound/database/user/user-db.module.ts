import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserModel } from './user.model';
import { MongooseModule } from '@nestjs/mongoose';

const repositoryList = [
  {
    provide: 'UserRepository',
    useClass: UserRepository,
  },
];

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: 'User', schema: UserModel.schema }],
      'db',
    ),
  ],
  providers: [...repositoryList],
  exports: ['UserRepository'],
})
export class UserDbModule {}
