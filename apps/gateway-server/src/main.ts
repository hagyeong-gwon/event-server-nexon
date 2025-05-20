import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { HttpExceptionFilter } from './shared/exception/http-exception.filter';
import { logger } from './middlewares/logger.middleware';
import { ConfigService } from '@nestjs/config';
import { ConfigSchema } from './base/config';
import { Logger } from '@nestjs/common';
import * as swaggerUi from 'swagger-ui-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  const configService = app.get(ConfigService<ConfigSchema, true>);
  const appName = configService.get('APP_NAME', { infer: true });
  const port = configService.get('PORT', 3000, { infer: true });
  const serverUrl = `http://localhost:${port}`;
  app.enableCors({
    origin: '*', // 개발 중엔 전체 허용
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();

  app.use(logger);
  const config = new DocumentBuilder()
    .setTitle('Gateway API')
    .setDescription('API Gateway Swagger Docs')
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

  const document = SwaggerModule.createDocument(app, config);

  app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(document, {
      explorer: true,
      swaggerOptions: {
        urls: [
          {
            url: `${serverUrl}/auth/docs-json`,
            name: 'Auth Service',
          },
          {
            url: `${serverUrl}/event/docs-json`,
            name: 'Event Service',
          },
        ],
      },
    }),
  );

  await app.listen(port);

  Logger.log(`Server(${appName}) is listening at ${serverUrl}`);
  Logger.log(`Server(${appName}) swagger is listening at ${serverUrl}/docs`);
}
bootstrap();
