import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Max } from 'class-validator';

export class CreateUserDTO {

    @IsOptional()
    id?: number;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsNumber({})
    @IsNotEmpty()
    age: number;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
    
}