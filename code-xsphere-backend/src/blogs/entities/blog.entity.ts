import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CommonBlog } from "./common/common.entity";

@Entity()
export class Blog extends CommonBlog {
  @PrimaryGeneratedColumn("uuid")
  blog_id: string;

  @Column()
  thumbnail_url: string;

  @Column()
  heading: string;

  @Column()
  body: string;

  @CreateDateColumn()
  @Index()
  dateCreated: Date;

  @Column('text', { array: true, default: [] })
  tags: string[];
}
