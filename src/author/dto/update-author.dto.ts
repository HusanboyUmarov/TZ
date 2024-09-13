import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsOptional, IsString } from 'class-validator';

import { CreateAuthorDto } from './create-author.dto';

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {
    
    @ApiProperty({example:'Alisher Navoiy', description:'this is name of author'})
    @IsOptional()
    @IsString()
    author?: string;

    @ApiProperty({example:'Alisher Navoiy was born  in 1441', description:'this is biography'})
    @IsOptional()
    @IsString()
    biography?: string
}
