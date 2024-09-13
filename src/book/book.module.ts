import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schema/book.schema';
import { Category, SchemaCategory } from 'src/category/models/category.entity';
import { Author, AuthorSchema } from 'src/author/models/author.entity';

@Module({
  imports:[MongooseModule.forFeature([
    {name:Book.name, schema:BookSchema},
    {name:Category.name, schema:SchemaCategory},
    {name:Author.name, schema:AuthorSchema}
  ])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
