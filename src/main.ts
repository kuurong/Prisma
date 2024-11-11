import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // dto 에 없는 프로퍼티가 넘어오는 것을 방지.
      // 예를들어 dto에 없는 프로퍼티와 함께 post할 경우, 성공되지만 해당 프로퍼티는 넘어오지않음.
      // 에러띄우고싶으면 밑에 forbidNonWhitelisted:true
      forbidNonWhitelisted: true,
      transform: true, //post request body가 항상 dto클래스의 인스턴스이게끔
    }),
  );
  await app.listen(3000);
}
bootstrap();
