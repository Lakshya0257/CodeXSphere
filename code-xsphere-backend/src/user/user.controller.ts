import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  findOne(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @Get(':id')
  user(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Post('update/:id')
  updateUser(@Param('id') id: string , @Body() updateDto: Partial<UpdateUserDto>) {
    return this.userService.updateUser(id, updateDto);
  }

  @Delete(':id/:key')
  remove(@Param('id') id: string, @Param('key') key: string) {
    return this.userService.remove(id,key);
  }
}
