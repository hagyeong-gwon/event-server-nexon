import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configSchema } from './index';
import { join } from 'path';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), '.env'),
      // envFilePath: join(process.cwd(), '/apps/gateway-server/.env'),
      validate: (config) => {
        return configSchema.parse(config);
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class ConfigCustomModule {}
