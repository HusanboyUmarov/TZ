import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class QueryAutherDto{
    @ApiProperty(
    {
        required:false,
        description:'to search author by name ',
        type:String
    }
    )
    search:string;
}