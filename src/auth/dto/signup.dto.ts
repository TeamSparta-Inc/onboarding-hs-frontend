import { IsNotEmpty, IsString, MinLength, MaxLength, MAX_LENGTH } from 'class-validator';
import { MAX_PASSWORD, MIN_PASSWORD } from './constant';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description : '유저 이름'})
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(MIN_PASSWORD)
  @MaxLength(MAX_PASSWORD)
  @ApiProperty({ description : '패스워드' })
  readonly password: string;
}

export class SignUpResponseDto {
  @ApiProperty({ example: 'sparta', description: '로그인 성공한 유저 이름'})
  username: string
}