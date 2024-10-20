import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { enableGracefulTermination } from './termination';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await enableGracefulTermination(app);
  await app.listen(3000);
}
bootstrap();
