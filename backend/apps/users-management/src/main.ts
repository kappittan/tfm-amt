import { NestFactory } from '@nestjs/core';
import { UsersManagementModule } from '../users-management.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { orgsEnv } from './modules/organizations/config/envs';

async function bootstrap() {
  const app = await NestFactory.create(UsersManagementModule);

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

  // TCP microservice to recibe requests from the cti-management module
  app.connectMicroservice({
    transport: 'TCP',
    options: {
      host: orgsEnv.host,
      port: orgsEnv.tcpPort,
    },
  });

  await app.startAllMicroservices();

  await app.listen(orgsEnv.restPort);
}
bootstrap();
