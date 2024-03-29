import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import 'dotenv/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppDataSource } from './data-source';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const PORT = process.env.PORT || '3000';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = Logger;

  app.enableCors();

  AppDataSource.initialize()
    .then(() => {
      // here you can start to work with your database
      console.log('Data Source ha sido inicializado');
    })
    .catch((error) =>
      console.error('Error during Data Source initialization', error),
    );

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('API Rega')
    .setDescription('Control de Registros Almest')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Rega')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);

  logger.log(`Server running in PORT ${await app.getUrl()} `);
}
bootstrap();
