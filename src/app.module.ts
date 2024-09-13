import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from '@nestjs/mongoose'
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        envFilePath: '.env',
        isGlobal:true
      }
    ),
    MongooseModule.forRoot(
    process.env.MONGO_DB,
    {autoCreate:true}
  ), BookModule, AuthorModule, CategoryModule,


],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
