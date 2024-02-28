import { Body, Controller, Post, Headers } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignUpDto } from './dto/signUp.dto'
import { SignInDto } from './dto/signin.dto'

@Controller('auth')
export class AuthController{
    constructor(private authService : AuthService){}

    @Post('signUp')
    async signUp(@Body() signUpDto: SignUpDto): Promise<{ username : string }>{
        const { username } = await this.authService.signUp(signUpDto)

        return { username }
    }

    @Post('signIn')
    async signIn(@Body() SignInDto: SignInDto) {
        const { accessToken, refreshToken } = await this.authService.signIn(SignInDto)
        return { accessToken, refreshToken }
    }

    @Post('refreshToken')
    async refreshtoken(@Headers('authorization') refreshToken: string){
        const newAccessToken = this.authService.refreshAccessToken(refreshToken)
        return { success : true, accessToken : newAccessToken}
    }
}