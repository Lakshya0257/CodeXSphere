import { IsNotEmpty } from "class-validator";
import { UserCredsDto } from "src/common/dtos/user-creds.dto";

export class CreateBlogDto extends UserCredsDto {

    @IsNotEmpty({always:true})
    thumbnail_url: string;
    @IsNotEmpty({always:true})
    title: string;
    @IsNotEmpty({always:true})
    body: string;
    tags: string[];
}
