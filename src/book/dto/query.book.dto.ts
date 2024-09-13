import { ApiProperty } from '@nestjs/swagger/dist/decorators';
export class QueryBookDto{
    @ApiProperty({required:false,description:'to search author by name ',type:String})
    search:string;
    @ApiProperty({required:false,description:'skip',type:Number})
    skip:number;
    @ApiProperty({required:false,description:'limit',type:Number})
    limit:number;
}