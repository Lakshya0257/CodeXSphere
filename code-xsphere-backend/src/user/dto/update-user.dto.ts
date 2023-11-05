import { UserCredsDto } from "src/common/dtos/user-creds.dto";
import { UsernameDto } from "./create-user.dto";
import { IsNotEmpty } from "class-validator";


export class UpdateProfileDto extends UserCredsDto{
    @IsNotEmpty({always:true})
    description: string;
    user: UpdateUsernameDto;
    
    github: string;
    linkedin: string;
}

export class UpdateUsernameDto{
    @IsNotEmpty({always:true})
    username: string;
    @IsNotEmpty({always:true})
    avatar: string;
}

