import { UserCredsDto } from "src/common/dtos/user-creds.dto";
import { UsernameDto } from "./create-user.dto";

export class UpdateProfileDto extends UserCredsDto{
    description: string;
    user: UpdateUsernameDto;
}

export class UpdateUsernameDto{
    username: string;
    avatar: string;
}

