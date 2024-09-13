import { ApiProperty } from "@nestjs/swagger/dist";
import { IsString, IsNotEmpty} from "class-validator";


export class CreateAuthorDto {
    @ApiProperty({example:'Alisher Navoiy', description:'this is name of author'})
    @IsNotEmpty()
    @IsString()
    name:string; 

    @ApiProperty({example:'Alisher Navoiy was born  in 1441', description:'this is biography'})
    @IsString()
    biography:string;
}
