import { UserCredsDto } from "src/common/dtos/user-creds.dto";

export class LikeBlogDto extends UserCredsDto{

    blog_id: string;
    liked_to: string;
    
}