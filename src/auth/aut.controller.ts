import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from "src/users/users.service";

import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { RegistrationGuard } from './guards/registration.guard';
import { LoginUserDto } from './dto/user-login.dto';
import { LoginGuard } from './guards/login.guard';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService, private authServices: AuthService) {}

  @UseGuards(LoginGuard)
  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
  {
      const user = await this.usersService.login(loginUserDto);

      const access = await this.authServices.generateAccessToken(user);
      const refresh = await this.authServices.generateRefreshToken(user._id as string)


      res.statusCode = HttpStatus.OK;
      return res.send({...access, ...refresh,  username: user.username });
    }
}


  @UseGuards(RegistrationGuard)
  @Post('registration')
  async registrationUser(
    @Body() CreateUserDto: CreateUserDto,
    @Res() res: Response,) {
  {
      await this.usersService.registration(CreateUserDto);


      res.statusCode = HttpStatus.CREATED;
      return res.send('user created');
    }
}
}
