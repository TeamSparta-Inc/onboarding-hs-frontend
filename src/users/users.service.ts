import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './schemas/user.schemas';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<{ username: string; password: string; refreshToken: string }> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async findOne(
    username: string,
  ): Promise<
    { username: string; password: string; refreshToken: string } | undefined
  > {
    return this.userModel.findOne({ username });
  }
}
