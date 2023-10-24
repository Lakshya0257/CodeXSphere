import { Blog } from "src/blogs/entities/blog.entity";
import { Usernames } from "src/common/entity/username.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Bookmarks{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=>Usernames, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'user', referencedColumnName:'user_id'})
    user: Usernames;

    @ManyToOne(()=>Blog, {onDelete: 'CASCADE'})
    @JoinColumn({name:'blog', referencedColumnName: 'blog_id'})
    blog: Blog;

}