import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.entity";
import { AbstractEntity } from "src/common/helper_entity/abstract.entity";

@Entity()
export class Connections extends AbstractEntity<Connections>{

    @PrimaryGeneratedColumn()
    id: number;

    @Column('uuid')
    following_id:string;

    @Column('uuid')
    followed_by:string;

    @ManyToOne(()=> Profile, {onDelete: 'CASCADE',cascade: true})
    @JoinColumn({name: 'following_id', referencedColumnName:'user_id'})
    following: Profile;

    @ManyToOne(()=> Profile, {onDelete: 'CASCADE',cascade: true})
    @JoinColumn({name: 'followed_by', referencedColumnName:'user_id'})
    followed: Profile;
}