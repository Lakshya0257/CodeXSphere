import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { AbstractEntity } from "../helper_entity/abstract.entity";

@Entity()
@Unique(['type_id']) 
export class MediaType extends AbstractEntity<MediaType>{

    @PrimaryGeneratedColumn({type: 'bigint'})
    type_id: number;

    @PrimaryColumn()
    type: string;

}