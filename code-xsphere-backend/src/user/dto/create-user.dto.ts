import { IsNotEmpty } from "class-validator";
import { UserCredsDto } from "src/common/dtos/user-creds.dto";

export class UsernameDto{
    @IsNotEmpty({always:true})
    username: string;
    @IsNotEmpty({always:true})
    avatar: string;

   
}

export class ProfileDto extends UserCredsDto{
    @IsNotEmpty({always:true})
    description: string;
    @IsNotEmpty({always:true})
    user: UsernameDto;

    github?: string;
    linkedin?: string;
}