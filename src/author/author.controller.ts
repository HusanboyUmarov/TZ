import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger/dist/decorators';
import mongoose from 'mongoose';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { QueryAutherDto } from './dto/query.author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@ApiTags('Auhtor')
@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}
  @ApiOperation({summary:'this is API add new author'})
  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.create(createAuthorDto);
  }
  @ApiOperation({summary:'this is return all authors'})
  @Get()
  findAll(@Query() query: QueryAutherDto) {
    return this.authorService.findAll(query);
  }
  @ApiOperation({summary:'this is find one author'})
  @Get(':id')
  findOne(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.authorService.findOne(id);
  }

  @ApiOperation({summary:'this is update author'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.update(id, updateAuthorDto);
  }

  @ApiOperation({summary:'this is deleted author'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorService.remove(id);
  }
}
