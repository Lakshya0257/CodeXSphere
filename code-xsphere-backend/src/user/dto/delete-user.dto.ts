import { IsNotEmpty } from 'class-validator';

export class DeleteUserDto{
    @IsNotEmpty({always:true})
    user_id:string;

    @IsNotEmpty({always:true})
    key:string;

    @IsNotEmpty({always:true})
    password:string;
}