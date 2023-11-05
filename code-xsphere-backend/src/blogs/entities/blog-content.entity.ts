import { AbstractEntity } from "src/common/helper_entity/abstract.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Blog } from "./blog.entity";

@Entity()
export class BlogContent extends AbstractEntity<BlogContent>{
    @PrimaryColumn('uuid')
    blog_id: string;

    @Column()
    body: string;

    @OneToOne(()=>Blog, (blog)=>blog.body,{onDelete:'CASCADE'})
    @JoinColumn({name: 'blog_id'})
    blog: Blog;
}