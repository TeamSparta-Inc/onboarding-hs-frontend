import { Body, Controller, Post, Headers, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, SignUpResponseDto } from './dto/signup.dto';
import { SignInDto, SignInResponseDto } from './dto/signIn.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';

@Controller('auth')
@ApiTags('auth API')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signUp')
  @ApiOperation({
    summary: '회원가입 API',
    description:
      '회원가입을 시도하고 로그인에 성공할 경우 유저네임을 반환한다.',
  })
  async signUp(@Body() signUpDto: SignUpDto): Promise<SignUpResponseDto> {
    console.log(signUpDto);
    const { username } = await this.authService.signUp(signUpDto);
    return { username };
  }

  @Post('signIn')
  @ApiOperation({
    summary: '로그인 API',
    description:
      '로그인을 시도하고 로그인에 성공할 경우 액세스 토큰과 리프레시 토큰을 반환한다.',
  })
  async signIn(@Body() SignInDto: SignInDto): Promise<SignInResponseDto> {
    const { accessToken, refreshToken } =
      await this.authService.signIn(SignInDto);
    return { accessToken, refreshToken };
  }

  @Post('refreshToken')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: '토큰 리프레시 API',
    description: '리프레시 토큰을 받아 새로운 액세스 토큰을 반환한다.',
  })
  async refreshToken(@Headers('authorization') refreshToken: string) {
    const newAccessToken = this.authService.refreshAccessToken(refreshToken);
    return { success: true, accessToken: newAccessToken };
  }
}
