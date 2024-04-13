import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

declare var module: any;

async function bootstrap() {
  var app = await NestFactory.create(AppModule);

  var config = new DocumentBuilder()
    .setTitle('Vigilant')
    .setDescription('Your API description')
    .setVersion('0.1')
    .addTag('Vigilant')
    .build();

  var document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
