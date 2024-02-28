import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, MAX_LENGTH } from 'class-validator';
import { MAX_PASSWORD, MIN_PASSWORD } from './constant';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(MIN_PASSWORD)
  @MaxLength(MAX_PASSWORD)
  readonly password: string;
}