import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength, isNotEmpty } from "class-validator";
import { MAX_PASSWORD, MIN_PASSWORD } from "./constant";


export class LoginDto{
    @IsNotEmpty()
    @IsEmail()
    readonly username : string

    @IsNotEmpty()
    @IsString()
    @MinLength(MIN_PASSWORD)
    @MaxLength(MAX_PASSWORD)
    readonly password : string;
} 