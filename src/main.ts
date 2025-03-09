import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as serverless from 'serverless-http';

const app = express();

async function bootstrap() {
  const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(app));

  // ✅ Enable CORS for all origins
  nestApp.enableCors({
    origin: '*',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  // ✅ Enable Validation Globally
  nestApp.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  // ✅ Swagger Configuration (for API documentation)
  const config = new DocumentBuilder()
    .setTitle('LifeOff API')
    .setDescription('API Documentation for my NestJS application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(nestApp, config);
  SwaggerModule.setup('api/docs', nestApp, document);

  await nestApp.init();
}

// ✅ Export serverless handler for Vercel
bootstrap().then(() => {
  module.exports = serverless(app);
});
