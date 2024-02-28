import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/createUser.dto';
import { Model } from 'mongoose';
import { User } from './schemas/user.schemas';
import { InjectModel } from '@nestjs/mongoose';



@Injectable()
export class UsersService {
   constructor(@InjectModel(User.name) private userModel: Model<User>){}

    async create(createUserDto : CreateUserDto) : Promise<User>{
      const newUser = new this.userModel(createUserDto)

      return newUser.save()
    }
}