import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable Validation Globally
  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true, 
    forbidNonWhitelisted: true 
  }));

  // ✅ Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('LifeOff website ')
    .setDescription('API Documentation for my NestJS application')
    .setVersion('1.0')
    .addBearerAuth() // Enables JWT authentication in Swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // Set the Swagger endpoint

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
