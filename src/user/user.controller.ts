import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto, GetUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get('/')
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('/:email')
  getUser(@Param('email') email) {
    return this.userService.getUser(email);
  }
}
