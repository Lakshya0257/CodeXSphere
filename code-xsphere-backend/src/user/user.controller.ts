import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/login-user.dto';
import { ProfileDto } from './dto/create-user.dto';
import { UserAuthGuard } from 'src/helpers/guards/user-auth/user-auth.guard';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateProfileDto } from './dto/update-user.dto';
import { OptionalUserCredsDto, UserCredsDto } from 'src/common/dtos/user-creds.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  create(@Body() loginDto: LoginDto) {
    return this.userService.signup(loginDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @Post('create')
  @UseGuards(UserAuthGuard)
  createProfile(@Body() createUserDto: ProfileDto){
    return this.userService.createUser(createUserDto);
  }

  @Delete('delete')
  deleteUser(@Body() deleteUserDto: DeleteUserDto){
    return this.userService.deleteUser(deleteUserDto);
  }

  @Get(':user_id')
  @UseGuards(UserAuthGuard)
  user(@Param('user_id') id: string, @Body() user: OptionalUserCredsDto) {
    return this.userService.getUser(id, user);
  }

  @Post('update')
  @UseGuards(UserAuthGuard)
  updateUser(@Body() updateProfile : UpdateProfileDto) {
    return this.userService.updateUser(updateProfile);
  }


  @Post('follow/:user_id')
  @UseGuards(UserAuthGuard)
  followUser(@Param('user_id') id: string, @Body() userCreds :UserCredsDto){
    return this.userService.followUser(id, userCreds);
  }

  @Get('followings/:user_id')
  getFollowings(){

  }

  @Get('/follwers/:user_id')
  getFollowers(){

  }

  @Get('bookmarks')
  getBookmarks(){

  }

  @Post('bookmarks/:blog_id')
  postBookmark(){
    
  }


}
