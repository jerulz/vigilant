import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config } from 'dotenv';
import { AppModule } from './app.module';

declare var module: any;

async function bootstrap() {
  var app = await NestFactory.create(AppModule);

  config();

  var swaggerConfig = new DocumentBuilder()
    .setTitle('Vigilant')
    .setDescription('Your API description')
    .setVersion('0.1')
    .addTag('Vigilant')
    .build();

  var document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
