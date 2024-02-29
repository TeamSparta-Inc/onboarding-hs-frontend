import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

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

  describe('signUp', () => {
    it('이메일과 패스워드를 입력하면 유저 네임을 반환합니다.', async () => {
      const signUpDto = { username: 'testUser', password: 'testPassword' };
      const expectedResponse = { username: 'testUser' };

      jest
        .spyOn(authService, 'createRefreshToken')
        .mockResolvedValueOnce({ refreshToken: 'testRefreshToken' });
      jest.spyOn(usersService, 'create').mockResolvedValueOnce({
        username: 'testUser',
        password: '1234',
        refreshToken: 'testRefreshToken',
      });

      const result = await authService.signUp(signUpDto);

      expect(result).toEqual(expectedResponse);
    });
  });
});
