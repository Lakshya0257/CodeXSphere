import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserAuthGuard } from './helpers/guards/user-auth/user-auth.guard';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalGuards(new UserAuthGuard());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(3000);
}
bootstrap();
