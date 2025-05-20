import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClaimModel } from './claim.model';
import { ClaimRepository } from './claim.repository';

const repositoryList = [
  {
    provide: 'ClaimRepository',
    useClass: ClaimRepository,
  },
];

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: 'Claim', schema: ClaimModel.schema }],
      'db',
    ),
  ],
  providers: [...repositoryList],
  exports: ['ClaimRepository'],
})
export class ClaimDbModule {}
