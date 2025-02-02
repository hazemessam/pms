import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AuthGuard } from './auth/guards/auth.guard';
import { AuditingInterceptor } from './auditing/interceptors/auditing.interceptor';
import { AuthService } from './auth/auth.service';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('api');
  app.useGlobalGuards(app.get(AuthGuard));
  app.useGlobalInterceptors(app.get(AuditingInterceptor));
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  app.enableCors();

  await setupSwagger(app);

  await app.get(AuthService).registerInitialAdmin();

  await app.listen(app.get(ConfigService).get('PORT') ?? 3000);
}

bootstrap();
