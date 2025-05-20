import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'AUTH',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: configService.get('AUTH_GRPC_URL'),
            package: 'authorization',
            protoPath:
              'dist/apps/gateway-server/src/base/grpc/proto/auth.proto',
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [],
  exports: [],
})
export class AuthGrpcModule {}
