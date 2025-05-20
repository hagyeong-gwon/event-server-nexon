import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'AUTH',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: configService.get('AUTH_GRPC_URL'),
            package: 'auth',
            protoPath: join(
              'dist/apps/event-server/src/base/grpc/proto/auth.proto',
            ),
            loader: {
              defaults: true,
              longs: Number,
              enums: String,
              arrays: true,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class AuthGrpcModule {}
