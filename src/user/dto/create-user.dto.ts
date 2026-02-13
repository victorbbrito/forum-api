import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString, IsStrongPassword, Min, MinLength } from "class-validator";

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    name: string;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsStrongPassword({minUppercase:1, minNumbers:1,minLength:8,minSymbols:1})
    password: string;
}