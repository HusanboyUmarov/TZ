
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import {IsNumber,IsOptional, IsString } from 'class-validator';

import mongoose from 'mongoose';


export class UpdateBookDto {
    @ApiProperty({example:'Sabbayi sayyor', description:'title name'})
     @IsOptional()
       @IsString()
        title:string;

    @ApiProperty({example:1478, description:'published year'})
     @IsOptional()
      @IsNumber()
       publishedYear:number;

    @ApiProperty({example:'about this book . . .', description:'information about this book'})
     @IsOptional()
      @IsString()
       summary:string;

    @ApiProperty({example:'author id', description:'must be author id'})
     @IsOptional()
      @IsString()
       author_id:mongoose.Schema.Types.ObjectId; 

    @ApiProperty({example:'category id', description:'must be category id'})
     @IsOptional()
      @IsString()
       category_id:mongoose.Schema.Types.ObjectId;
}
