import { Usernames } from "src/common/entity/username.entity";
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { Blog } from "./blog.entity";

@Entity()
export class BlogLikes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('uuid')
  blog_id: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => Blog, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'blog_id', referencedColumnName: 'blog_id' })
  blog: Blog;

  @ManyToOne(() => Usernames,(user)=>user.liked_blogs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  user: Usernames;

  @ManyToOne(()=>Usernames,(user)=>user.likes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'liked_to', referencedColumnName: 'user_id' })
  liked_to: Usernames;
}
