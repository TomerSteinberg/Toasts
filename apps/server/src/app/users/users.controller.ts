import {
  Body,
  Controller,
  Post,
  Param,
  Patch,
  Query,
  Get,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUser } from './dto/create-user.dto';
import { UpdateUser } from './dto/update-user.dto';
import { UserLogin } from './dto/user-login.dto';
import { Users } from './entities/users.entity';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  signUp(@Body() userParams: CreateUser, @Query('adminId') adminId?: string) {
    return this.usersService.signup(userParams, adminId);
  }

  @Post('login')
  login(@Body() userParams: UserLogin) {
    return this.usersService.login(userParams);
  }

  @Patch('user/:id')
  updateUser(@Body() userParams: UpdateUser, @Param('id') userId: string) {
    return this.usersService.updateUser(userParams, userId);
  }

  @Patch('make_admin/:id')
  makeAdmin(@Param('id') userId: string, @Query('adminId') adminId: string) {
    return this.usersService.makeAdmin(userId, adminId);
  }

  @Get('users')
  getUsers(): Promise<Users[]> {
    return this.usersService.getUsers();
  }
}
