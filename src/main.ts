import { NestFactory } from '@nestjs/core';
import { env } from 'process';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';

dotenv.config();
const globalPrefix = 'api/feature';
const APIVersionHeader = 'X-API-VERSION';
const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(helmet());

  app.setGlobalPrefix(globalPrefix);

  //Versioning
  app.enableVersioning({
    type: VersioningType.HEADER,
    header: APIVersionHeader,
  });

  //Validation Pipeline
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  await app.listen(port);
}
bootstrap();
