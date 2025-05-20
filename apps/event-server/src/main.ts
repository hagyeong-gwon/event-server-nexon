import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middlewares/logger.middleware';
import helmet from 'helmet';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigSchema } from './base/config';
import { HttpExceptionFilter } from './shared/exception/http-exception.filter';

import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('Asia/Seoul');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.setGlobalPrefix('event');
  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(logger);
  app.use(helmet());

  const configService = app.get(ConfigService<ConfigSchema, true>);

  const appName = configService.get('APP_NAME', { infer: true });
  const port = configService.get('PORT', 3000, { infer: true });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Event API')
    .setDescription('이벤트 및 보상 서버')
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
  SwaggerModule.setup('event/docs', app, document);
  app
    .getHttpAdapter()
    .getInstance()
    .get('/docs-json', (req, res) => {
      res.json(document);
    });
  await app.listen(port || 3000);

  Logger.log(`Server(${appName}) is listening at http://localhost:${port}`);
  Logger.log(`Swagger API Doc is available at http://localhost:${port}/docs`);
}
bootstrap();
