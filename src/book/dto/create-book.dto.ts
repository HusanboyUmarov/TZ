import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import mongoose from "mongoose";

export class CreateBookDto {

    @ApiProperty({example:'Sabbayi sayyor', description:'title name'})
     @IsString()
      @IsNotEmpty()
       title:string;

    @ApiProperty({example:1478, description:'published year'})
     @IsNumber()
      publishedYear:number;

    @ApiProperty({example:'about this book . . .', description:'information about this book'})
     @IsString()
      summary:string;

    @ApiProperty({example:'author id', description:'must be author id'})
     @IsString()
      author_id:mongoose.Schema.Types.ObjectId; 

    @ApiProperty({example:'category id', description:'must be category id'})
     @IsString()
      category_id:mongoose.Schema.Types.ObjectId;
}
