import {
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LoginDto } from "./dto/login-user.dto";
import { Credentials } from "./entities/creds.entity";
import { ProfileDto } from "./dto/create-user.dto";
import { Usernames } from "src/common/entity/username.entity";
import { Media } from "src/common/entity/media.entity";
import { MediaType } from "src/common/entity/media-type.entity";
import { Profile } from "./entities/profile.entity";
import { DeleteUserDto } from "./dto/delete-user.dto";
import { UpdateProfileDto } from "./dto/update-user.dto";
import { OptionalUserCredsDto, UserCredsDto } from "src/common/dtos/user-creds.dto";
import { Connections } from "./entities/connections.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Credentials) private readonly credentialsRepository: Repository<Credentials>,
    @InjectRepository(Usernames) private readonly usernamesRepository: Repository<Usernames>,
    @InjectRepository(Media) private readonly mediaRepository: Repository<Media>,
    @InjectRepository(Connections) private readonly connectionRepository: Repository<Connections>,
    @InjectRepository(Profile) private readonly profileRepository: Repository<Profile>,
    @InjectRepository(MediaType)
  private readonly mediaTypeRepository: Repository<MediaType>,
  ) {}

  //signup user(new user registration)
  async signup(loginDto: LoginDto) {
    const check = await this.credentialsRepository.findOne({where: {email: loginDto.email}})
    if(check!==null){
      throw new HttpException('Email already in use', HttpStatus.CONFLICT)
    }
    const newUser: Credentials = new Credentials({...loginDto});
    return await this.credentialsRepository.save(newUser);
  }

  //login user
  async login(loginDto: LoginDto) {
    console.log(loginDto.password);
    const user = await this.credentialsRepository.findOne({where: {email: loginDto.email, password: loginDto.password}})
    if(user!==null){
      return user;
    }
    throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED)
  }

  async deleteUser(deleteUserDto: DeleteUserDto){
    const user = await this.credentialsRepository.findOne({where: {user_id: deleteUserDto.user_id, key: deleteUserDto.key, password: deleteUserDto.password}})
    console.log(user);
    if(user!==null){
      await this.credentialsRepository.remove(user);
      return {
        'status': 'success'
      }
    }
    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED)
  }

  //create a new user profile
  async createUser(createUserDto: ProfileDto) {
    let media_type: MediaType = await this.mediaTypeRepository.findOne({ where: {type: 'profile'} })
    if(media_type===null){
      const newMedia: MediaType = new MediaType({type: 'profile'});
      media_type = await this.mediaTypeRepository.save(newMedia);
    }

    const newProfile: Profile = new Profile({
      user_id: createUserDto.user_id,
      description: createUserDto.description,
      user: new Usernames({
        user_id: createUserDto.user_id,
        avatar: new Media({image: createUserDto.user.avatar, media_type_id: media_type.type_id}),
        username: createUserDto.user.username
      })
    })

    return await this.profileRepository.save(newProfile);
  }

  //get a user profile
  async getUser(id: string, curUser: OptionalUserCredsDto) {
    let followUser: boolean = false;
    if(curUser.user_id){
      console.log('Thinking that user follow or not')
      const follow =await this.connectionRepository.findOne({ where: {following_id: id, followed_by: curUser.user_id} })
      if(follow!==null){
        followUser= true;
      }
    }
    console.log(followUser);
    let user = await this.profileRepository.findOne({where: {user_id: id}, relations:['user','user.avatar', 'links','following_to','followed_by']});
    if(user===null){
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    return {
      user: user.user,
      description: user.description,
      date_created: user.date_created,
      links: user.links,
      following : user.followed_by.length,
      followers: user.following_to.length,
      isFollowing: curUser.user_id? followUser : undefined
    }
  }

  //update user profile
  async updateUser(updateUserDto: UpdateProfileDto) {
    const profile = await this.profileRepository.findOne({
        where: { user_id: updateUserDto.user_id },
        relations: ['user', 'user.avatar']
    });

    if (!profile) {
        throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }

    profile.user.username = updateUserDto.user.username;
    profile.description = updateUserDto.description;
    profile.user.avatar.image = updateUserDto.user.avatar;

    await this.profileRepository.save(profile);
    return {
        status: 'success'
    };
}

  //folow user
  async followUser(id: string, userCreds: UserCredsDto){
    const exists = await this.connectionRepository.findOne({where:{following_id: id, followed_by:userCreds.user_id}});
    if(exists===null){
      const connection: Connections = new Connections({following_id: id, followed_by: userCreds.user_id});
      const save = await this.connectionRepository.save(connection);
      if(save){
        return {
          status: 'success',
          data: 'Followed user successfully'
        }
      }
      throw new HttpException('Internal Error occurred', HttpStatus.BAD_REQUEST)
    }
    await this.connectionRepository.delete(exists);
    return {
      status: 'success',
      data: 'Unfollowed user successfully'
    }
  }
}
