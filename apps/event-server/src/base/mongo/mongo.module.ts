import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigSchema } from '../config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      connectionName: 'db',
      useFactory: (configService: ConfigService<ConfigSchema, true>) => {
        return {
          uri: configService.get('MONGO_DB', { infer: true }),
          autoCreate: true,
        };
      },
    }),
  ],
  controllers: [],
  // providers: [...repositoryProviders],
  exports: [MongooseModule],
})
export class MongoModule {}
