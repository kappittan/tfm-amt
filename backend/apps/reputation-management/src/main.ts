import { NestFactory } from '@nestjs/core';
import { ReputationManagementModule } from './reputation-management.module';

async function bootstrap() {
  const app = await NestFactory.create(ReputationManagementModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
