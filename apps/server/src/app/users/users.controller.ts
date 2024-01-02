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
import { UserDTO } from './dto/user.dto';
import { Users } from './entities/users.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  signUp(@Body() userParams: UserDTO) {
    return this.usersService.signup(userParams);
  }

  @Post('login')
  login(@Body() userParams: UserDTO) {
    return this.usersService.login(userParams);
  }

  @Patch('/:id')
  updateUser(@Body() userParams: UserDTO, @Param('id') userId: string) {
    return this.usersService.updateUser(userParams, userId);
  }

  @Patch('make_admin/:id')
  makeAdmin(@Param('id') userId: string, @Query('adminId') adminId: string) {
    return this.usersService.makeAdmin(userId, adminId);
  }

  @Get()
  getUsers(): Promise<Users[]> {
    return this.usersService.getUsers();
  }
}
