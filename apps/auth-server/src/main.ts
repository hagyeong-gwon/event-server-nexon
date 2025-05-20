import { NestFactory } from '@nestjs/core';
import { AuthServerModule } from './auth-server.module';

import { HttpExceptionFilter } from './shared/exception/http-exception.filter';
import { logger } from './middlewares/logger.middleware';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigSchema } from './base/config';
import { Logger } from '@nestjs/common';
import {
  GrpcOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AuthServerModule, {
    cors: true,
  });

  app.setGlobalPrefix('auth');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();

  app.use(logger);
  app.use(helmet());

  const configService = app.get(ConfigService<ConfigSchema, true>);

  const appName = configService.get('APP_NAME', { infer: true });
  const port = configService.get('PORT', 3000, { infer: true });
  const grpcPort = configService.get('GRPC_PORT', 3000, { infer: true });

  const grpcOptions: GrpcOptions = {
    transport: Transport.GRPC,
    options: {
      loader: {
        longs: Number,
        enums: String,
        defaults: true,
      },
      url: `0.0.0.0:${grpcPort}`,
      package: ['auth'],
      protoPath: [join('dist/apps/auth-server/src/base/grpc/proto/auth.proto')],
    },
  };

  app.connectMicroservice<MicroserviceOptions>(grpcOptions);
  await app.startAllMicroservices();

  const swaggerConfig = new DocumentBuilder()
    .setTitle(appName)
    .setDescription('유저 서버')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'bearer',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('auth/docs', app, document);
  app
    .getHttpAdapter()
    .getInstance()
    .get('/docs-json', (req, res) => {
      res.json(document);
    });
  await app.listen(port || 3000);
  const httpUrl = `http://localhost:${port}`;
  const grpcUrl = `http://localhost:${grpcPort}`;
  Logger.log(`Server(${appName}) is listening at ${httpUrl}`);
  Logger.log(`Server(${appName}-grpc) is listening at ${grpcUrl}`);
}
bootstrap();
