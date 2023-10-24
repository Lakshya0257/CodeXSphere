import { IsNotEmpty } from "class-validator";

export abstract class UserCredsDto{
    @IsNotEmpty({always:true})
    user_id : string;
    @IsNotEmpty({always:true})
    key : string;
}

export abstract class OptionalUserCredsDto{
    user_id : string;
    key : string;
}