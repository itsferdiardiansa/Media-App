import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'
import * as dotenv from 'dotenv'

import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port') || 3000;

  const apiVersion = process.env.API_VERSION || 'v1'; // Default 'v1' if not set
  app.setGlobalPrefix(`api/${apiVersion}`)

  app.use(cookieParser())

  // Formatter for vlidation error
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  // Formatter for HTTP Exceptions
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
