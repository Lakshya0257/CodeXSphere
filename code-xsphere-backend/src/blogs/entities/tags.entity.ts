import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Blog } from "./blog.entity";
import { AbstractEntity } from "src/common/helper_entity/abstract.entity";

@Entity()
export class Tags extends AbstractEntity<Tags>{
    @PrimaryGeneratedColumn('uuid')
    tag_id:string;

    @Column()
    tag_name:string;

    @ManyToMany(()=>Blog,(blog)=>blog.tags)
    blogs: Blog[]
}