import { IsNotEmpty } from "class-validator";
import { UserCredsDto } from "src/common/dtos/user-creds.dto";

export class CreateCommentDto extends UserCredsDto{
    @IsNotEmpty({always: true})
    comment: string;
}