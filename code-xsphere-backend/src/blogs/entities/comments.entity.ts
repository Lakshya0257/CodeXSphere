import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CommonBlog } from "./common/common.entity";

@Entity()
export class Comments extends CommonBlog{

    @PrimaryGeneratedColumn('uuid')
    comment_id: string;

    @Column()
    blog_id: string;

    @CreateDateColumn()
    dateCreated: Date;

    @Column()
    comment: string;

}