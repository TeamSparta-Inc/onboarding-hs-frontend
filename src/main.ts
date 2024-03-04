import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from 'swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // 추후 프론트 서버 지정

  setupSwagger(app);
  await app.listen(8080);
}
bootstrap();
