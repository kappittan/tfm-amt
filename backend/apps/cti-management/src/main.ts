import { NestFactory } from '@nestjs/core';
import { CtiManagementModule } from './cti-management.module';

async function bootstrap() {
  const app = await NestFactory.create(CtiManagementModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
