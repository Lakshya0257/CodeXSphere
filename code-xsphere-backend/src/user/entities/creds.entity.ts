import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { AbstractEntity } from "src/common/helper_entity/abstract.entity";
import { Exclude } from "class-transformer";
import { Usernames } from "src/common/entity/username.entity";

@Entity()
@Unique(['user_id'])
export class Credentials extends AbstractEntity<Credentials>{

    @PrimaryGeneratedColumn('uuid')
    user_id: string;

    @PrimaryGeneratedColumn('uuid')
    key:string;

    @PrimaryColumn()
    @Exclude()
    email:string; 

    @Column()
    password:string;

    @OneToOne(()=>Usernames , (user)=>user.credentials)
    user : Usernames
}