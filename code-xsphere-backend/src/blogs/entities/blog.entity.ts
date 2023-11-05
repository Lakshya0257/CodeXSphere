import { Media } from "src/common/entity/media.entity";
import { Usernames } from "src/common/entity/username.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tags } from "./tags.entity";
import { BlogLikes } from "./likes.entity";
import { Comments } from "./comments.entity";
import { AbstractEntity } from "src/common/helper_entity/abstract.entity";
import { BlogContent } from "./blog-content.entity";

@Entity()
export class Blog extends AbstractEntity<Blog>{
  @PrimaryGeneratedColumn("uuid")
  blog_id: string;

  @Column('uuid')
  user: string;

  @ManyToOne(() => Usernames, { onDelete: 'CASCADE'})
  @JoinColumn({ name: "user" })
  creator: Usernames;

  @Column({ default: 0 }) // Initialize total_likes with 0
  total_likes: number;

  @Column()
  title: string;

  @OneToOne(()=>Media,(media)=>media.blog, {cascade: true})
  thumbnail: Media;

  @CreateDateColumn()
  date_created: Date;

  @OneToOne(()=>BlogContent, (blog)=>blog.blog,{cascade: true})
  body: BlogContent;

  @ManyToMany(()=>Tags, (tag)=>tag.blogs, { cascade: true })
  @JoinTable()
  tags: Tags[]

  @OneToMany(()=>BlogLikes, (likes)=>likes.blog )
  liked_users: BlogLikes[];

  @OneToMany(()=>Comments,(comment)=>comment.blog)
  comments: Comments[];
}
