import { ApiProperty } from '@nestjs/swagger/dist/decorators';
export class QueryCategoryDto{
    @ApiProperty({required:false,description:'to search author by name ',type:String})
    search:string;
}