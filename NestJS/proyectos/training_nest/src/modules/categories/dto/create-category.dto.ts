import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { IsNull } from "typeorm";



export class CreateCategoryDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsArray()
    @IsNumber({}, {each: true})
    commentsIds: number[];

}
