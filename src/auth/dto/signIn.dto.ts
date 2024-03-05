import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  isNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '유저 이름' })
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(10)
  @ApiProperty({ description: '패스워드' })
  readonly password: string;
}

export class SignInResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    description: 'Access token for the authenticated user',
  })
  accessToken: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    description: 'Refresh token for the authenticated user',
  })
  refreshToken: string;
}
