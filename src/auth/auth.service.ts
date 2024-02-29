import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ username: string }> {
    const { username, password } = signUpDto;
    const { refreshToken } = await this.createRefreshToken({ username });
    const user = await this.usersService.create({
      username,
      password,
      refreshToken,
    });

    return { username: user.username };
  }

  async signIn(
    signInDto: SignInDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { username } = signInDto;

    const user = this.usersService.findOne(username);

    if (!user) throw new Error('존재하지 않는 유저입니다');

    const { accessToken } = await this.createAccessToken({ username });
    const { refreshToken } = await this.createRefreshToken({ username });

    return { accessToken, refreshToken };
  }

  async createAccessToken(username: Pick<SignUpDto, 'username'>) {
    const payload = { username };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async createRefreshToken(username: Pick<SignUpDto, 'username'>) {
    const payload = { username };
    return {
      refreshToken: this.jwtService.sign(payload, { expiresIn: '600s' }),
    };
  }

  async refreshAccessToken(
    refreshToken: string,
  ): Promise<{ accessToken: string }> {
    const decodedRefreshToken = this.jwtService.verify(refreshToken);

    const username = decodedRefreshToken.username;
    const user = await this.usersService.findOne(username);

    const { accessToken } = await this.createAccessToken({
      username: user.username,
    });
    return { accessToken };
  }
}
