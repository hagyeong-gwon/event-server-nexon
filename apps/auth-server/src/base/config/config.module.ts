import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configSchema } from './index';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), '.env'),
      // envFilePath: join(process.cwd(), '/apps/auth-server/.env'),
      validate: (config) => {
        return configSchema.parse(config);
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class ConfigCustomModule {}
