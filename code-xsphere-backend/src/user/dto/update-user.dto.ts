import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    // name?: string;
    // avatarUrl?: string;
    // user_id: string;
    key: string;
}
