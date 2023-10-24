import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Blog } from "./blog.entity";
import { Usernames } from "src/common/entity/username.entity";
import { AbstractEntity } from "src/common/helper_entity/abstract.entity";

@Entity()
export class Comments extends AbstractEntity<Comments>{

    @PrimaryGeneratedColumn('uuid') 
    comment_id: string;

    @Column('uuid')
    user_id: string;

    @Column('uuid')
    blog_id: string;

    @ManyToOne(()=>Blog, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'blog_id', referencedColumnName: 'blog_id'})
    blog: string;

    @CreateDateColumn()
    dateCreated: Date;

    @Column()
    comment: string;

    @ManyToOne(()=>Usernames, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'user_id', referencedColumnName: 'user_id'})
    user: string;

}