import { Module } from '@nestjs/common';
import { InviteRepository } from './invite.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { InviteModel } from './invite.model';

const repositoryList = [
  {
    provide: 'InviteRepository',
    useClass: InviteRepository,
  },
];
@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: 'Invite', schema: InviteModel.schema }],
      'db',
    ),
  ],
  providers: [...repositoryList],
  exports: ['InviteRepository'],
})
export class InviteDbModule {}
