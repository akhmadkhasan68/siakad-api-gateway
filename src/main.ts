import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { config } from './config';
import { HttpExceptionFilter } from './infrastructures/filters/http-exception.filter';
import { BaseRpcExceptionFilter } from '@nestjs/microservices';
import { RpcExceptionFilter } from './infrastructures/filters/rpc-exception.filter';
import { ResponseInterceptor } from './infrastructures/interceptors/response.interceptor';
import { ValidationPipe } from './infrastructures/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter(), new RpcExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor())
  
  await app.listen(config.app.port);
}
bootstrap();
