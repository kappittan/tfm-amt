import { NestFactory } from '@nestjs/core';
import { CtiManagementModule } from '../cti-management.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ctisEnv } from './modules/ctis/config/envs';

async function bootstrap() {
  const app = await NestFactory.create(CtiManagementModule);

  // Enable ValidationPipe for all routes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Convert data to the expected types in the DTOs
      whitelist: true, // Ignore properties that are not in the DTO
      forbidNonWhitelisted: true, // Reject unknown properties in requests
      disableErrorMessages: false, // Include detailed error messages
    }),
  );

  app.enableCors();

  await app.listen(ctisEnv.port);
}
bootstrap();
