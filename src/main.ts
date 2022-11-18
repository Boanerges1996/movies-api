import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
  });

  const configService = app.get(ConfigService);
  const port = configService.get('port');
  const globalPrefix = configService.get('globalPrefix');

  const optionsSwagger: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  app.setGlobalPrefix(globalPrefix);
  const config = new DocumentBuilder()
    .setTitle('Movie')
    .setDescription('Movie API description')
    .setVersion('1.0')
    .addTag('movie-api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config, optionsSwagger);
  SwaggerModule.setup('/api', app, document);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.enableCors();

  await app.listen(port);
}
bootstrap();
