import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { QueryBookDto } from './dto/query.book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@ApiTags('Book')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOperation({summary:'this is created new book'})
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }
  @ApiOperation({summary:'this is returned all books'})
  @Get()
  async findAll(@Query() query:QueryBookDto) {
    return await this.bookService.findAll(query);
  }
  @ApiOperation({summary:'this is return one book'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }
  @ApiOperation({summary:'this is updated book'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }
  @ApiOperation({summary:'this is delete book'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}
