import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signIn.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ username: string }> {
    const { username, password } = signUpDto;

    const existingUser = await this.usersService.findOne(username);
    if (existingUser) {
      throw new ConflictException('이미 가입된 유저네임입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { refreshToken } = await this.createRefreshToken({ username });
    const user = await this.usersService.create({
      username,
      password: hashedPassword,
      refreshToken,
    });

    return { username: user.username };
  }

  async signIn(
    signInDto: SignInDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { username, password } = signInDto;

    const user = await this.usersService.findOne(username);

    if (!user) throw new NotFoundException('존재하지 않는 유저입니다');

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('비밀번호가 맞지 않습니다.');
    }

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
    try {
      const decodedRefreshToken = this.jwtService.verify(refreshToken);

      const username = decodedRefreshToken.username;
      const user = await this.usersService.findOne(username);

      const { accessToken } = await this.createAccessToken({
        username: user.username,
      });
      return { accessToken };
    } catch (error) {
      if (error instanceof TokenExpiredError)
        throw new Error('리프레시 토큰이 만료되었습니다.');

      throw new Error('유효하지 않은 형식의 리프레시 토큰입니다.');
    }
  }
}
