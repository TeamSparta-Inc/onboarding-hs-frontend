import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { JwtService } from '@nestjs/jwt'
import { SignUpDto } from './dto/signUp.dto';
import { User } from 'src/users/schemas/user.schemas';


@Injectable()
export class AuthService {
    constructor(
      private usersService: UsersService,
      private jwtService: JwtService
    ) {}

    async signUp(signUpDto : SignUpDto) : Promise<{user : User}>{

        const { username, email, password } = signUpDto
        const { refreshToken } = await this.createRefreshToken({ username })
        const newUser = await this.usersService.create({ username, email, password, refreshToken})

        return { user: newUser }
    }

    async signIn(){
        return
    }

    async logOut(){}

    async register(){}

    async createAccessToken( username : Pick<SignUpDto, 'username'>){
        const payload = { username }
        return {
            accessToken: this.jwtService.sign(payload)
        }
    }

    async createRefreshToken(username : Pick<SignUpDto, 'username'>){
        const payload = { username }
        return { refreshToken : this.jwtService.sign(payload, { expiresIn : '600s'})}
    }

    async refreshAccessToken(refreshToken: string):Promise<{ accessToken : string}>{
        const decodedRefreshToken = this.jwtService.verify(refreshToken)

        const username = decodedRefreshToken.username
        const user = await this.usersService.findOne(username)

        const { accessToken } = await this.createAccessToken({username: user.username})
        return { accessToken }
    }
}