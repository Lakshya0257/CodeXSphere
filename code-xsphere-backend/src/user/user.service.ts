import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { LoginDto } from "./dto/login-user.dto";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const check= await this.userRepository.findOne({where: {
      email: createUserDto.email
    }});
    if(check!==null){
      throw new UnauthorizedException({
        
          status: "error",
          message : "Email already exists."
        
      })
    }
    let newUser: User = new User();
    newUser.avatar = createUserDto.avatarUrl;
    newUser.name = createUserDto.name;
    newUser.email = createUserDto.email;
    newUser.password = createUserDto.password;
    newUser.followers_ids = [];
    newUser.following_ids = [];
    newUser.requests = [];
    newUser.likes = 0;
    newUser.about= createUserDto.about;

    const user = await this.userRepository.save(newUser);

    return {
      status: "success",
      user_id: user.user_id,
      key : user.key
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email, password: loginDto.password },
    });

    if (user!==null) {
      return {
        status: "Login successful",
        user_id: user.user_id,
        key : user.key,
        username: user.name,
        avatar: user.avatar
      };
    }
    throw new UnauthorizedException("Invalid Credentials");
  }

  async getUser(id: string) {
    const user = await this.userRepository.findOne({ where: { user_id: id } });
    if (user!==null) {
      return {
        name: user.name,
        avatar: user.avatar,
        followers: user.followers_ids,
        following: user.following_ids,
        requests: user.requests,
        likes: user.likes,
      };
    }
    throw new NotFoundException("User not found");
  }

  async updateUser(id: string, userInput: Partial<UpdateUserDto>) {
    const checkUser  = await this.userRepository.findOne({where : {user_id: id , key: userInput.key}});
    if(checkUser!==null){
      const user = await this.userRepository.update(id, userInput);
      return {
        status: "Updated successfully",
        data: {
          'avatar': user.raw.avatar,
          'name': user.raw.name,
        }
      };
    }else{
      throw new NotFoundException("User not found");
    }
  }

  async remove(id: string, key:string) {
    const user = await this.userRepository.delete({key:key , user_id:id});
    if(user.affected===0){
      throw new NotFoundException("User not found");
    }else{
      return {
        'status': "Deleted successfully"
      }
    }
  }
}
