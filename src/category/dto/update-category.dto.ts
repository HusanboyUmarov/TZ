import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsOptional, IsString } from 'class-validator';

import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    
    @ApiProperty({example:'Badiy', description:'name of category'})
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({example:'this book ...', description:'this is description'})
    @IsOptional()
    @IsString()
    description?:string;
}
