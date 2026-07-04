import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {TransformerInterceptor} from "./utils/transformer/transformer.interceptor"
import { ValidationPipe } from '@nestjs/common'; 'nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformerInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
