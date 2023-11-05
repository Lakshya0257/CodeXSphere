import { MediaType } from "src/common/entity/media-type.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.entity";
import { AbstractEntity } from "src/common/helper_entity/abstract.entity";

@Entity()
export class Links extends AbstractEntity<Links>{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    link: string;

    @Column({default: 0})
    visited : number;

    @ManyToOne(()=>MediaType, {cascade: true, eager: true})
    @JoinColumn({name : 'media_type' , referencedColumnName: 'type_id'})
    media_type : MediaType;

    @Column('uuid')
    user_id: string;

    @ManyToOne(()=>Profile , {onDelete: 'CASCADE'})
    @JoinColumn({name : 'user_id' , referencedColumnName: 'user_id'})
    profile : Profile;
}