import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

const testUser = {
  username: 'testUser',
  password: '1234',
  refreshToken: 'testRefreshToken',
};

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
        .mockResolvedValueOnce({ refreshToken: 'testRefreshToken' });
      jest.spyOn(usersService, 'create').mockResolvedValueOnce(testUser);

      const result = await authService.signUp(signUpDto);

      expect(result).toEqual(expectedResponse);
    });

    it('로그인 성공시 Access Token과 Refresh Token을 반환합니다.', async () => {
      const signInDto = { username: 'testUser', password: 'testPassword' };
      const expectedResponse = {
        accessToken: '1q2w3e4r',
        refreshToken: '4r3e2w1q',
      };

      jest.spyOn(usersService, 'findOne').mockResolvedValueOnce(testUser);
      jest
        .spyOn(authService, 'createAccessToken')
        .mockResolvedValueOnce({ accessToken: 'testRefreshToken' });
      jest
        .spyOn(authService, 'createRefreshToken')
        .mockResolvedValueOnce({ refreshToken: 'testRefreshToken' });

      const result = await authService.signIn(signInDto);

      expect(result).toEqual(expectedResponse);
    });
  });
});
