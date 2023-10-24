import { MediaType } from "src/common/entity/media-type.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.entity";

@Entity()
export class Links{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    link: string;

    @Column({default: 0})
    visited : number;

    @ManyToOne(()=>MediaType, {cascade: true})
    @JoinColumn({name : 'media_type' , referencedColumnName: 'type_id'})
    media_type : MediaType;

    @ManyToOne(()=>Profile , {onDelete: 'CASCADE'})
    @JoinColumn({name : 'user' , referencedColumnName: 'user_id'})
    profile : Profile;
}