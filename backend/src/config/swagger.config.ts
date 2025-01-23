import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import metadata from 'src/metadata';

export async function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('PMS API Docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  await SwaggerModule.loadPluginMetadata(metadata);

  SwaggerModule.setup('api/docs', app, () =>
    SwaggerModule.createDocument(app, config),
  );
}
