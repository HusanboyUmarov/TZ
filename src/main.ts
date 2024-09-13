import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';


const start = async()=>{
  const PORT = process.env.PORT
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe());
  
  const config = new DocumentBuilder()
  .setTitle('Kitoblar kutubxonasi API')
  .setDescription(`Ushbu loyiha kitoblar kutubxonasini boshqarish uchun backend API yaratishni o'z ichiga oladi. API kitoblar, mualliflar va kitob kategoriyalari haqidagi ma'lumotlarni saqlash va boshqarishga imkon beradi.`)
  .setVersion('')
  .addTag(`
  Node.js: Backendni ishlatish uchun (Nestjs),
  MongoDB: Ma'lumotlar bazasi sifatida,
  Mongoose: MongoDB bilan ishlash uchun ORM.`)
  .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document)


  
  await app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT} . . . `)
  });
}

start()