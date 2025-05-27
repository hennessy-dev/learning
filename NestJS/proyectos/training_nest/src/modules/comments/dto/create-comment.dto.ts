import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Category } from "src/modules/categories/entities/category.entity";
import { User } from "src/modules/users/entities/user.entity";


export class CreateCommentDto {

    @IsString()
    @IsNotEmpty()
    comment: string;

    @IsNotEmpty()
    @IsNumber()
    userId: number;
    
    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    categoriesIds?: string[];

}

