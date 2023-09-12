import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { User, UsersDocument } from 'src/schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UsersDocument>,
  ) {}

  async registration(createUserDto: CreateUserDto): Promise<User | null> {
    const existingUser = await this.usersModel.collection.findOne({
      username: createUserDto.username,
    });

    if (existingUser) {
      return null;
    }

    const createUser = new this.usersModel(createUserDto);
    return createUser.save();
  } 
}