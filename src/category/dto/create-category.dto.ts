import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { IsNotEmpty } from "class-validator";
import { IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({example:'Badiy', description:'name of category'})
    @IsString()
    @IsNotEmpty()
    name:string;

    @ApiProperty({example:'this book ...', description:'this is description'})
    @IsString()
    description:string

}
