import { UserCredsDto } from "src/common/dtos/user-creds.dto";

export class UpdateBlogDto extends UserCredsDto {

    thumbnail_url: string;
    title: string;
    body: string;
    tags: string[];
}