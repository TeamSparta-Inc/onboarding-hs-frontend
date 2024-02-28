import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from 'src/auth/auth.service'
import { JwtService } from '@nestjs/jwt'

describe('AuthService', () => {
    let authService : AuthService
    let jwtService : JwtService

    const mockUser = {
        _id: '1q2w3e4r!',
        email: 'hyesung@sparta.co',
        password : '12341234'
    }

    let mockToken  = 'jwtToken'

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({}).compile();
    
        authService = module.get<AuthService>(AuthService);
        jwtService = module.get<JwtService>(JwtService);
      });


    it('Access 토큰과 Refresh 토큰은 올바른 형태로 발급되어야 한다.', async () => {

        jest.spyOn(jwtService, 'signAsync').mockResolvedValueOnce(mockToken);

        const { accessToken, refreshToken } = await authService.signIn(mockUser.email, mockUser.password);

        const decodedAccessToken = jwtService.decode(accessToken);
        const decodedRefreshToken = jwtService.decode(refreshToken)

        // 토큰의 페이로드 확인
        expect(decodedAccessToken.sub).toEqual(mockUser._id);
        expect(decodedAccessToken.email).toEqual(mockUser.email);

        expect(decodedRefreshToken.sub).toEqual(mockUser._id);
        expect(decodedRefreshToken.email).toEqual(mockUser.email);

        // 토큰의 서명 확인
        const isValidAccessToken = jwtService.verify(accessToken);
        expect(isValidAccessToken).toBeTruthy();

        const isVaildRefreshToken = jwtService.verify(refreshToken);
        expect(isVaildRefreshToken).toBeTruthy();

        // 토큰의 만료 시간 확인
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const accessTokenExp = decodedAccessToken.exp;
        const refreshTokenExp = decodedRefreshToken.exp;

        expect(accessTokenExp).toBeGreaterThan(currentTimestamp);
        expect(refreshTokenExp).toBeGreaterThan(currentTimestamp)

        expect(accessToken).toEqual({ accessToken: mockToken });
        expect(refreshToken).toEqual({ refreshToken: mockToken })
    });

    it('액세스 토큰이 만료되었다면 리프레시 토큰을 통해 액세스 토큰을 갱신한다'), async () => {
        const payload = { sub: mockUser._id, username: mockUser.email };

        // 만료 시간이 지난 액세스 토큰 생성 (5초 만료)
        const expiredAccessToken = jwtService.sign({ ...payload, exp: Math.floor(Date.now() / 1000) - 10 });

        const refreshToken = jwtService.sign(payload);
        const {newAccessToken} = await authService.refreshAccessToken(refreshToken);

        // 새로 발급된 액세스 토큰이 유효한지 확인
        const decodedNewAccessToken = jwtService.decode(newAccessToken);
        expect(decodedNewAccessToken).toBeTruthy();
        expect(decodedNewAccessToken.sub).toEqual(mockUser._id);
        expect(decodedNewAccessToken.username).toEqual(mockUser.email);
    }

    it('로그인 시 리프레시 토큰도 만료되었다면 새로운 리프레시 토큰을 발행한다.'), async () => {
        const payload = { sub: mockUser._id, username: mockUser.email };

        // 만료 시간이 지난 리프레시 토큰 생성 (5초 만료)
        const expiredRefreshToken = jwtService.sign({ ...payload, exp: Math.floor(Date.now() / 1000) - 10 });

        const { newAccessToken, newRefreshToken } = await authService.createRefreshToken(expiredRefreshToken);

        expect(newAccessToken).toBeTruthy();
        expect(newRefreshToken).toBeTruthy();

    }
})
