import { NestFactory } from '@nestjs/core';
import { UsersManagementModule } from './users-management.module';

async function bootstrap() {
  const app = await NestFactory.create(UsersManagementModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
