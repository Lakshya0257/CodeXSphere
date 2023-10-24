import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MediaType } from "./media-type.entity";
import { AbstractEntity } from "../helper_entity/abstract.entity";
import { Usernames } from "./username.entity";
import { Blog } from "src/blogs/entities/blog.entity";

@Entity()
export class Media extends AbstractEntity<Media>{

    @PrimaryGeneratedColumn({ type: 'bigint'})
    media_id: number;

    @Column()
    image: string;

    @Column()
    media_type_id: number;

    @Column('uuid',{'nullable':true, select:false})
    user_id?: string;

    @Column('uuid',{'nullable':true})
    blog_id?: string;

    @OneToOne(()=>Usernames,(username)=>username.avatar, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'user_id'})
    user: Usernames;

    @OneToOne(()=>Blog,(blog)=>blog.thumbnail, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'blog_id'})
    blog: Blog;

    @ManyToOne(()=> MediaType)
    @JoinColumn({ name: 'media_type_id', referencedColumnName: 'type_id' })
    media_type: MediaType;
}