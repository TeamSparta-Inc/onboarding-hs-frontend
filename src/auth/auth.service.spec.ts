import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signin.dto';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const testUser = {
  username: 'testUser',
  password: '1234',
  refreshToken: 'testRefreshToken',
};

const testRefreshToken = 'testRefreshToken';
const testAccessToken = 'testAccessToken';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('testAccessToken'),
            verify: jest.fn().mockReturnValue({ username: 'testUsername' }),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(jwtService).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('AuthService', () => {
    it('회원가입 성공시 유저 네임을 반환합니다.', async () => {
      const signUpDto = { username: 'testUser', password: 'testPassword' };
      const expectedResponse = { username: 'testUser' };

      jest
        .spyOn(authService, 'createRefreshToken')
        .mockResolvedValueOnce({ refreshToken: testRefreshToken });
      jest.spyOn(usersService, 'create').mockResolvedValueOnce(testUser);

      const result = await authService.signUp(signUpDto);

      expect(result).toEqual(expectedResponse);
    });

    it('로그인 성공시 Access Token과 Refresh Token을 반환합니다.', async () => {
      const signInDto = {
        username: testUser.username,
        password: testUser.password,
      };
      const expectedResponse = {
        accessToken: testAccessToken,
        refreshToken: testRefreshToken,
      };

      jest.spyOn(usersService, 'findOne').mockResolvedValueOnce(testUser);
      jest
        .spyOn(authService, 'createAccessToken')
        .mockResolvedValueOnce({ accessToken: testAccessToken });
      jest
        .spyOn(authService, 'createRefreshToken')
        .mockResolvedValueOnce({ refreshToken: testRefreshToken });
      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(true));

      const result = await authService.signIn(signInDto);

      expect(result).toEqual(expectedResponse);
    });

    it('유저를 찾을 수 없을 때 NotFoundException을 발생시킵니다.', async () => {
      const signInDto: SignInDto = {
        username: 'testUser',
        password: 'testPassword',
      };

      jest.spyOn(usersService, 'findOne').mockResolvedValueOnce(undefined);

      await expect(authService.signIn(signInDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('비밀번호가 일치하지 않을 때 UnauthorizedException을 발생시킵니다.', async () => {
      const signInDto: SignInDto = {
        username: 'testUser',
        password: 'wrongPassword',
      };

      jest.spyOn(usersService, 'findOne').mockResolvedValueOnce(testUser);
      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(false));

      await expect(authService.signIn(signInDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('Refresh 토큰을 통해 새로운 Access Token을 발급합니다.', async () => {
      const refreshToken = testRefreshToken;
      const expectedResponse = { accessToken: testAccessToken };

      jest.spyOn(usersService, 'findOne').mockResolvedValueOnce(testUser);

      const result = await authService.refreshAccessToken(refreshToken);

      expect(result).toEqual(expectedResponse);
    });
  });
});
